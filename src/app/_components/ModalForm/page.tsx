import { Trash2 } from "lucide-react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3 flex-inline" controlId="form-slug">
              <FloatingLabel controlId="slug" label="Slug" className="mb-3">
                <Form.Control placeholder="text-muted" />
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
                <Form.Control placeholder="My first page" />
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
                <Form.Control placeholder="This is just a test" />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default ModalForm;
