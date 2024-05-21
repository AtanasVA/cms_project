"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";
import PaginationRow from "../_components/PaginationRow/page";
import { createPost, deletePost } from "~/server/queries";
import { SinglePageDataWithPostsType } from "./page";

type RenderPageFieldsProps = {
  parentSlug: string;
  pagePosts?: SinglePageDataWithPostsType["posts"];
};

const RenderPageFields = ({ parentSlug, pagePosts }: RenderPageFieldsProps) => {
  const [createdFields, setCreatedFields] = useState<
    SinglePageDataWithPostsType["posts"]
  >(pagePosts || []);

  const handleOnDelete = async (pageId: number) => {
    try {
      const response = await deletePost(pageId);
      if (response) {
        setCreatedFields((prev) => prev.filter((page) => pageId !== page.id));
      }
    } catch (error) {
      console.log("Something went wrong..", error);
    }
  };

  const handleAddNewField = async () => {
    const response = (await createPost({
      parentSlug,
      postContent: "",
    })) as any; //TODO: Add proper types

    if (response?.data) {
      setCreatedFields((prev) => [...prev, response.data]);
    }
  };

  const handleFieldChange = (value: string, fieldId: number) => {
    setCreatedFields(
      (prev) =>
        prev.map((field) =>
          field.id === fieldId ? { id: fieldId, postContent: value } : field
        ) as any //TODO: Add proper types
    );
  };

  return (
    <Container className="mt-2 pt-4">
      <Button
        className="d-flex align-items-center gap-1"
        variant="outline-light"
        onClick={handleAddNewField}
      >
        {<Plus size={20} />}
        Add new field
      </Button>
      <Row className="mb-3 mt-3 text-align-center align-items-center justify-content-center gap-3">
        {createdFields.map((post) => (
          <Col
            key={post.id}
            className="border border-grey rounded col-hover p-2 text-align-center align-items-center d-flex gap-2"
            md={4}
          >
            {
              <Form.Control
                placeholder="Enter text"
                value={post.postContent}
                onChange={({ target }) =>
                  handleFieldChange(target.value, post.id)
                }
              />
            }
            {
              <Button
                className="d-flex align-items-center gap-1"
                variant="outline-danger"
                onClick={() => handleOnDelete(post.id)}
              >
                {<Trash2 size={20} />}
              </Button>
            }
          </Col>
        ))}
      </Row>
      <Row>
        <PaginationRow />
      </Row>
    </Container>
  );
};

export default RenderPageFields;
