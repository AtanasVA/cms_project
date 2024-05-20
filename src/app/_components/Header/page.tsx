"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Plus } from "lucide-react";
import ModalView from "../Modal/page";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpenCreate = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="m-2 p-2 d-inline-flex w-auto gap-2">
      <Button
        className="d-flex align-items-center gap-1"
        variant="outline-light"
        onClick={handleModalOpenCreate}
      >
        {<Plus size={20} />}
        Add new page
      </Button>
      <div className="border border-danger" />
      <ModalView isOpen={isModalOpen} handleClose={handleModalClose} />
    </div>
  );
};

export default Header;
