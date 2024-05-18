import { Trash2 } from "lucide-react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

type ModalFormProps = {
  isEdit: boolean;
  pagesData?: {
    slug: string;
    title: string;
    description: string;
  }[];
};

const ModalForm = ({ isEdit, pagesData }: ModalFormProps) => {
  return (
    <Form>
      <Container>
        <Row className={`${isEdit ? "d-flex align-items-center" : ""}`}>
          <Col md={isEdit ? 0 : 6}>
            <Form.Group className="mb-3 flex-inline" controlId="form-slug">
              <FloatingLabel controlId="slug" label="Slug" className="mb-3">
                <Form.Control placeholder="text-muted" />
                {!isEdit && (
                  <Form.Text className="text-muted">
                    url for accessing your page
                  </Form.Text>
                )}
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col md={isEdit ? 0 : 6}>
            <Form.Group
              className="mb-3 flex-inline"
              controlId="form-meta-title"
            >
              <FloatingLabel
                controlId="meta-title"
                label="Title"
                className="mb-3"
              >
                <Form.Control placeholder="My first page" />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col md={isEdit ? 4 : 0}>
            <Form.Group className="mb-3" controlId="form-meta-description">
              <FloatingLabel
                controlId="meta-description"
                label="Description"
                className="mb-3"
              >
                <Form.Control placeholder="This is just a test" />
              </FloatingLabel>
            </Form.Group>
          </Col>
          {isEdit && (
            <Col md={2}>
              <Button variant="outline-danger" onClick={() => {}}>
                {<Trash2 />}
              </Button>
            </Col>
          )}
        </Row>
      </Container>
    </Form>
  );
};

export default ModalForm;
