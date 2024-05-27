"use server";

import { revalidateTag } from "next/cache";

export async function clearPagesTag() {
  revalidateTag("all-pages");
}

export async function clearPostsTag() {
  revalidateTag("all-posts");
}
