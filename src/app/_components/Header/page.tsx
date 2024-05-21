"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Plus } from "lucide-react";
import ModalView from "../Modal/page";
import { Home } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

type ParamsType = {
  slug: string;
};

const Header = () => {
  const { slug }: ParamsType = useParams();
  const router = useRouter();

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
        disabled={slug ? false : true}
        onClick={() => router.push("/")}
      >
        {<Home size={20} />}
      </Button>
      <div className="border border-danger" />

      <Button
        className="d-flex align-items-center gap-1"
        variant="outline-light"
        onClick={handleModalOpenCreate}
      >
        {<Plus size={20} />}
        Add new page
      </Button>
      <ModalView isOpen={isModalOpen} handleClose={handleModalClose} />
    </div>
  );
};

export default Header;
