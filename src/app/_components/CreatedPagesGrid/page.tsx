"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import PaginationRow from "../PaginationRow/page";
import ModalView from "../Modal/page";
import {
  CreatedPagesDataContext,
  type CreatedPagesDataContextType,
  type SinglePageData,
} from "shared/PagesDataContext";
import toast from "react-hot-toast";
import { deletePage } from "~/server/queries";

type CreatedPagesGridProps = {
  paginationArgs: {
    page: string;
    limit: string;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalCount: number;
  };
};

const CreatedPagesGrid = ({ paginationArgs }: CreatedPagesGridProps) => {
  const { push } = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editPageId, setEditPageId] = useState<string | null>(null);
  const [editPageSlug, setEditPageSlug] = useState<string | null>(null);
  const { createdPagesCtxData, setCreatedPagesCtxData } =
    useContext<CreatedPagesDataContextType>(CreatedPagesDataContext);

  const [createdPages, setCreatedPages] =
    useState<SinglePageData[]>(createdPagesCtxData);

  useEffect(() => {
    setCreatedPages(createdPagesCtxData);
  }, [createdPagesCtxData]);

  const handleModalOpenEdit = (pageId: string, pageSlug: string) => {
    setIsModalOpen(true);
    setEditPageId(pageId);
    setEditPageSlug(pageSlug);
  };

  const handleOnDelete = async (pageId: string) => {
    try {
      const response: SinglePageData = await toast.promise(deletePage(pageId), {
        loading: "Loading",
        success: "Page deleted",
        error: "Something went wrong",
      });

      if (response) {
        setCreatedPagesCtxData((prev) =>
          prev.filter((page) => response.id !== page.id)
        );
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditPageId(null);
    setEditPageSlug(null);
  };

  return (
    <Container className="mt-2 px-4 pt-4">
      <div style={{ minHeight: "300px" }}>
        {createdPages.map((page) => (
          <Row
            key={page.id}
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
              {page.metaTitle}
            </Col>
            <Col className="d-flex gap-2">
              <Button
                className="d-flex align-items-center gap-1"
                variant="outline-light"
                onClick={() => handleModalOpenEdit(page.id, page.slug)}
              >
                {<Pencil size={20} />}
                Edit
              </Button>
              <Button
                className="d-flex align-items-center gap-1"
                variant="outline-danger"
                onClick={() => handleOnDelete(page.id)}
              >
                {<Trash2 size={20} />}
                Delete
              </Button>
            </Col>
          </Row>
        ))}
      </div>
      <Row>
        <PaginationRow paginationArgs={paginationArgs} />
      </Row>
      <ModalView
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        editPageId={editPageId}
        editPageSlug={editPageSlug}
      />
    </Container>
  );
};

export default CreatedPagesGrid;
