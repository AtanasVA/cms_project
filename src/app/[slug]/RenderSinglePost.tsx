"use client";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Trash2 } from "lucide-react";
import Button from "react-bootstrap/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SinglePageDataWithPostsType } from "./page";
import { useDebounce } from "../_components/Debounce/useDebounce";
import toast from "react-hot-toast";
import { deletePost, updatePost } from "utils/queries";

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
      const data = await updatePost({
        postId,
        postContent: currentPostContent,
      });
      if (data) {
        toast.success("Post updated successfully");
      }
    };

    if (postContent !== currentPostContent) {
      savePostInput();
    }
  }, [debouncedSearch]);

  const handleOnDelete = async (postId: number) => {
    try {
      const response = await toast.promise(deletePost(postId), {
        loading: "Loading",
        success: "Post deleted",
        error: "Something went wrong",
      });
      if (response) {
        setCreatedPosts((prev) => prev.filter((post) => postId !== post.id));
      }
    } catch (error: any) {
      toast.error(error);
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
