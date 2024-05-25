"use client";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Trash2 } from "lucide-react";
import Button from "react-bootstrap/Button";
import { deletePost, updatePost } from "~/server/queries";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SinglePageDataWithPostsType } from "./page";
import { useDebounce } from "../_components/Debounce/useDebounce";

type RenderSinglePostProps = {
  postId: number;
  postContent?: string;
  setCreatedPosts: Dispatch<
    SetStateAction<SinglePageDataWithPostsType["posts"]>
  >;
};

const RenderSinglePost = ({
  postId,
  postContent,
  setCreatedPosts,
}: RenderSinglePostProps) => {
  const [currentPostContent, setCurrentPostContent] = useState<
    string | undefined
  >(postContent);

  const debouncedSearch = useDebounce(currentPostContent, 1000);

  useEffect(() => {
    const savePostInput = async () => {
      await updatePost({
        postId,
        postContent: currentPostContent,
      });
    };

    if (postContent !== currentPostContent) {
      savePostInput();
    }
  }, [debouncedSearch]);

  const handleOnDelete = async (pageId: number) => {
    try {
      const response = await deletePost(pageId);
      if (response) {
        setCreatedPosts((prev) => prev.filter((page) => pageId !== page.id));
      }
    } catch (error) {
      console.log("Something went wrong..", error);
    }
  };

  return (
    <Col
      className="border border-grey rounded col-hover p-2 text-align-center align-items-center d-flex gap-2"
      md={4}
    >
      <Form.Control
        placeholder="Enter text"
        value={currentPostContent}
        onChange={({ target }) => setCurrentPostContent(target.value)}
      />
      <Button
        className="d-flex align-items-center gap-1"
        variant="outline-danger"
        onClick={() => handleOnDelete(postId)}
      >
        {<Trash2 size={20} />}
      </Button>
    </Col>
  );
};

export default RenderSinglePost;
