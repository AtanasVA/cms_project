"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import ModalView from "../Modal/page";

import { Trash2, Plus, Pencil, Eye } from "lucide-react";
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleModalOpenCreate = () => {
    setIsModalOpen(true);
  };
  const handleModalOpenEdit = () => {
    setIsModalOpen(true);
    setIsEdit(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEdit(false);
  };

  const handleOnView = () => console.log("Something Viewed");
  const handleOnDelete = () => console.log("Something Deleted");

  return (
    <div className="m-2 p-2 d-inline-flex w-auto gap-2">
      <Button
        className="d-flex align-items-center gap-1"
        variant="outline-light"
        onClick={handleModalOpenCreate}
      >
        {<Plus size={20} />}
        Add
      </Button>
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
        variant="outline-light"
        onClick={handleOnView}
      >
        {<Eye size={20} />}
        View
      </Button>
      <Button
        className="d-flex align-items-center gap-1"
        variant="outline-danger"
        onClick={handleOnDelete}
      >
        {<Trash2 size={20} />}
        Delete
      </Button>
      <ModalView
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        isEdit={isEdit}
      />
    </div>
  );
};

export default Header;
