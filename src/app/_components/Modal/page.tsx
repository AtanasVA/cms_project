"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext, useEffect, useState } from "react";
import { createPage, getPage, updatePage } from "~/server/queries";
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

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  editPageId?: string | null;
};

const ModalView = ({ isOpen, handleClose, editPageId }: ModalProps) => {
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
      if (editPageId) {
        try {
          const [pageData]: SinglePageData[] = await getPage(editPageId);
          if (pageData) {
            setPageSlug(pageData.slug);
            setPageTitle(pageData.metaTitle);
            setPageDescription(pageData.metaDescription);
          }
        } catch (error) {
          console.log("Something went wrong..", error);
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
          return handleClose();
        } else if (error) {
          return console.log(
            "There has been an error creating the page:",
            error
          );
        }
      }

      console.log("Missing fields!");
    } catch (error) {
      console.log("Something went wrong...", error);
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
          return handleClose();
        } else if (error) {
          return console.log(
            "There has been an error creating the page:",
            error
          );
        }
      }
      console.log("Missing fields!");
    } catch (error) {
      console.log("Something went wrong...", error);
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
          variant="secondary"
          onClick={() =>
            editPageId ? handleUpdate(editPageId) : handleCreatePage()
          }
        >
          {saveButtonText}
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalView;
