"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type ModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const ModalView = ({ isOpen, handleClose }: ModalProps) => {
  return (
    <>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleOnView = () => console.log("Something Viewed");
  const handleOnDelete = () => console.log("Something Deleted");

  return (
    <div className="m-2 p-2 border border-primary d-inline-flex w-auto gap-2">
      <Button variant="outline-light" onClick={handleModalOpen}>
        Add
      </Button>
      <Button variant="outline-light" onClick={handleModalOpen}>
        Edit
      </Button>
      <Button variant="outline-light" onClick={handleOnView}>
        View
      </Button>
      <Button variant="outline-danger" onClick={handleOnDelete}>
        Delete
      </Button>
      <ModalView isOpen={isModalOpen} handleClose={handleModalClose} />
    </div>
  );
};

export default Header;
