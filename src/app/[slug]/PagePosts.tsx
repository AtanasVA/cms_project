"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Plus } from "lucide-react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import PaginationRow from "../_components/PaginationRow/page";
import { SinglePageDataWithPostsType } from "./page";
import RenderSinglePost from "./RenderSinglePost";
import toast from "react-hot-toast";
import { createPost } from "~/server/queries";

type RenderPageFieldsProps = {
  parentSlug: string;
  pagePosts?: SinglePageDataWithPostsType["posts"];
};

const RenderPageFields = ({ parentSlug, pagePosts }: RenderPageFieldsProps) => {
  const [createdPosts, setCreatedPosts] = useState<
    SinglePageDataWithPostsType["posts"]
  >(pagePosts || []);

  const handleAddNewField = async () => {
    const response = (await toast.promise(
      createPost({ parentSlug, postContent: "" }),
      {
        loading: "Loading",
        success: "Post created succesfully",
        error: "Error with post creation",
      }
    )) as any; //TODO: Add proper types

    if (response?.data) {
      setCreatedPosts((prev) => [...prev, response.data]);
    }
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
        {createdPosts.map((post) => (
          <RenderSinglePost
            key={post.id}
            postId={post.id}
            postContent={post.postContent}
            setCreatedPosts={setCreatedPosts}
          />
        ))}
      </Row>
      <Row>
        <PaginationRow />
      </Row>
    </Container>
  );
};

export default RenderPageFields;
