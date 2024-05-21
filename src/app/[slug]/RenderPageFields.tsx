"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";
import PaginationRow from "../_components/PaginationRow/page";

const RenderPageFields = () => {
  const [createdFields, setCreatedFields] =
    useState<typeof SAMPLE_FIELDS>(SAMPLE_FIELDS);

  const handleOnDelete = async (pageId: number) => {
    try {
      setCreatedFields((prev) => prev.filter((page) => pageId !== page.id));
    } catch (error) {
      console.log("Something went wrong..", error);
    }
  };

  const handleAddNewField = () => {
    setCreatedFields((prev) => [
      ...prev,
      { id: createdFields.length + 1, data: "" },
    ]);
  };

  const handleFieldChange = (value: string, fieldId: number) => {
    setCreatedFields((prev) =>
      prev.map((field) =>
        field.id === fieldId ? { id: fieldId, data: value } : field
      )
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
        {createdFields.map((fieldData) => (
          <Col
            key={fieldData.id}
            className="border border-grey rounded col-hover p-2 text-align-center align-items-center d-flex gap-2"
            md={4}
          >
            {
              <Form.Control
                placeholder="Enter text"
                value={fieldData.data}
                onChange={({ target }) =>
                  handleFieldChange(target.value, fieldData.id)
                }
              />
            }
            {
              <Button
                className="d-flex align-items-center gap-1"
                variant="outline-danger"
                onClick={() => handleOnDelete(fieldData.id)}
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

const SAMPLE_FIELDS = [
  { id: 1, data: "Something" },
  { id: 2, data: "Something2" },
  { id: 3, data: "Something3" },
];

export default RenderPageFields;
