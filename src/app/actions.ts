"use server";

import { revalidateTag } from "next/cache";

export default async function clearPagesTag() {
  revalidateTag("all-pages");
}
