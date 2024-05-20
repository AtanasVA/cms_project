import { SinglePageData } from "shared/PagesDataContext";

type ApiResponse = { data?: SinglePageData; error?: string | null };

export const getPages = async () => {
  const response = await fetch("http://localhost:3000/api/pages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response) throw new Error("Failed to fetch pages");

  return response.json();
};

export const getPage = async (pageSlug: string) => {
  const response = await fetch(
    `http://localhost:3000/api/pages?pageSlug=${pageSlug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

  const response = await fetch("http://localhost:3000/api/pages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updatePage = async (data: {
  id: string;
  slug: string;
  metaTitle: string;
  metaDescription?: string;
}): Promise<ApiResponse> => {
  if (!data) throw new Error("Missing page data");
  const response = await fetch("http://localhost:3000/api/pages", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deletePage = async (id: string) => {
  const response = await fetch("http://localhost:3000/api/pages", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: id,
  });
  return response.json();
};
