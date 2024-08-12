import { SinglePageData } from "shared/PagesDataContext";
import { clearPagesTag, clearPostsTag } from "~/app/actions";

type ApiResponse = { data?: SinglePageData; error?: string | null };

//Pages
//TODO:Fix Type

export const getPages = async (page: string, limit: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/pages?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["all-pages"],
      },
    }
  );

  if (!response) throw new Error("Failed to fetch pages");
  return response.json();
};

export const getPage = async (pageSlug: string, withPosts = false) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/pages?pageSlug=${pageSlug}&withPosts=${withPosts}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["all-pages"],
      },
    }
  );
  if (!response) throw new Error("Page not found");
  return response.json();
};

export const createPage = async (data: {
  slug: string;
  metaTitle: string;
  metaDescription?: string;
}): Promise<ApiResponse> => {
  if (!data) throw new Error("Missing page data");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  clearPagesTag();
  return response.json();
};

export const updatePage = async (data: {
  id: string;
  slug: string;
  metaTitle: string;
  metaDescription?: string;
}): Promise<ApiResponse> => {
  if (!data) throw new Error("Missing page data");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  clearPagesTag();
  return response.json();
};

export const deletePage = async (pageId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/pages?pageId=${pageId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  clearPagesTag();
  return response.json();
};

//Posts
//TODO: Add Type

export const getPosts = async (parentSlug: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts?parentSlug=${parentSlug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["all-posts"],
      },
    }
  );

  if (!response) throw new Error("Page not found");

  return response.json();
};

export const createPost = async (data: {
  parentSlug: string;
  postContent: string;
}): Promise<ApiResponse> => {
  if (!data) throw new Error("Missing post data");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  clearPostsTag();
  clearPagesTag();
  return response.json();
};

export const updatePost = async (data: {
  postId: number;
  postContent?: string;
}) => {
  if (!data) throw new Error("Missing post data");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  clearPostsTag();
  clearPagesTag();
  return response.json();
};

export const deletePost = async (id: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
  clearPostsTag();
  clearPagesTag();
  return response.json();
};
