import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalForm from "../ModalForm/page";

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  isEdit?: boolean;
};

const ModalView = ({ isOpen, handleClose, isEdit = false }: ModalProps) => {
  const modalTitle = isEdit ? "Edit" : "Create new page";
  const saveButtonText = isEdit ? "Update" : "Create";

  return (
    <Modal show={isOpen} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalForm isEdit={isEdit} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} type="submit">
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
