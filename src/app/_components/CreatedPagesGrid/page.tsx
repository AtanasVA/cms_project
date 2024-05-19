"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import PaginationRow from "../PaginationRow/page";
import ModalView from "../Modal/page";

type CreatedPagesGridProps = {
  pagesData?: {
    slug: string;
    title: string;
    description: string;
  }[];
};

const CreatedPagesGrid = ({ pagesData }: CreatedPagesGridProps) => {
  const { push } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleModalOpenEdit = () => {
    setIsModalOpen(true);
    setIsEdit(true);
  };
  const handleOnDelete = () => console.log("Something Deleted");
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Container className="mt-2 px-4 pt-4">
      {pagesData?.map((page) => (
        <Row
          key={page.slug}
          className="mb-3 text-align-center align-items-center justify-content-center gap-3"
          md={6}
        >
          <Col
            className="border border-grey rounded col-hover p-2"
            onClick={() => {
              push(`/${page.slug}`);
            }}
            md={4}
          >
            {page.title}
          </Col>
          <Col className="d-flex gap-2">
            <Button
              className="d-flex align-items-center gap-1"
              variant="outline-light"
              onClick={handleModalOpenEdit}
            >
              {<Pencil size={20} />}
              Edit
            </Button>
            <Button
              className="d-flex align-items-center gap-1"
              variant="outline-danger"
              onClick={handleOnDelete}
            >
              {<Trash2 size={20} />}
              Delete
            </Button>
          </Col>
        </Row>
      ))}
      <Row>
        <PaginationRow />
      </Row>
      <ModalView
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        isEdit={isEdit}
      />
    </Container>
  );
};

export default CreatedPagesGrid;
