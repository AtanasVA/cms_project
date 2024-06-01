"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  CreatedPagesDataContext,
  type CreatedPagesDataContextType,
  type SinglePageData,
} from "shared/PagesDataContext";
import toast from "react-hot-toast";
import { createPage, getPage, updatePage } from "../../../app/utils/queries";

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  editPageId?: string | null;
  editPageSlug?: string | null;
};

const ModalView = ({
  isOpen,
  handleClose,
  editPageId,
  editPageSlug,
}: ModalProps) => {
  const [pageSlug, setPageSlug] = useState<string>();
  const [pageTitle, setPageTitle] = useState<string>();
  const [pageDescription, setPageDescription] = useState<string>();
  const { setCreatedPagesCtxData } = useContext<CreatedPagesDataContextType>(
    CreatedPagesDataContext
  );

  const modalTitle = editPageId ? "Edit" : "Create new page";
  const saveButtonText = editPageId ? "Update" : "Create";

  useEffect(() => {
    if (!editPageId) {
      setPageSlug(undefined);
      setPageTitle(undefined);
      setPageDescription(undefined);
    }

    const getEditedPageData = async () => {
      if (editPageSlug) {
        try {
          const [pageData]: SinglePageData[] = await getPage(editPageSlug);
          if (pageData) {
            setPageSlug(pageData.slug);
            setPageTitle(pageData.metaTitle);
            setPageDescription(pageData.metaDescription);
          }
        } catch (error: any) {
          toast.error(error);
        }
      }
    };
    getEditedPageData();
  }, [editPageId, isOpen]);

  const handleCreatePage = async () => {
    try {
      if (pageSlug && pageTitle) {
        const { data, error } = await createPage({
          slug: pageSlug,
          metaTitle: pageTitle,
          metaDescription: pageDescription,
        });

        if (data) {
          setCreatedPagesCtxData((prev) => [...prev, data]);
          toast.success("Page created successfully");
          return handleClose();
        } else if (error) {
          return toast.error(error);
        }
      }
      toast("Missing fields!", {
        icon: "⚠️",
      });
    } catch (error: any) {
      toast.error(error);
    }
  };

  const handleUpdate = async (pageId: string) => {
    try {
      if (pageSlug && pageTitle) {
        const { data, error } = await updatePage({
          id: pageId,
          slug: pageSlug,
          metaTitle: pageTitle,
          metaDescription: pageDescription,
        });

        if (data) {
          setCreatedPagesCtxData((prev) => {
            const notUpdatedData = prev.filter(
              (page) => page.id !== editPageId
            );

            return [...notUpdatedData, data];
          });
          toast.success("Page created successfully");
          return handleClose();
        } else if (error) {
          return toast.error(error);
        }
      }
      toast("Missing fields!", {
        icon: "⚠️",
      });
    } catch (error: any) {
      toast.error(error);
    }
  };

  if (!isOpen) return null;
  return (
    <Modal show={isOpen} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Container>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3 flex-inline" controlId="form-slug">
                  <FloatingLabel controlId="slug" label="Slug" className="mb-3">
                    <Form.Control
                      value={pageSlug || ""}
                      onChange={({ target }) => setPageSlug(target.value)}
                    />
                    <Form.Text className="text-muted">
                      url for accessing your page
                    </Form.Text>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3 flex-inline"
                  controlId="form-meta-title"
                >
                  <FloatingLabel
                    controlId="meta-title"
                    label="Title"
                    className="mb-3"
                  >
                    <Form.Control
                      value={pageTitle || ""}
                      onChange={({ target }) => setPageTitle(target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col md={0}>
                <Form.Group className="mb-3" controlId="form-meta-description">
                  <FloatingLabel
                    controlId="meta-description"
                    label="Description"
                    className="mb-3"
                  >
                    <Form.Control
                      value={pageDescription || ""}
                      onChange={({ target }) =>
                        setPageDescription(target.value)
                      }
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() =>
            editPageId ? handleUpdate(editPageId) : handleCreatePage()
          }
        >
          {saveButtonText}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalView;
