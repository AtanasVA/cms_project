import { prisma } from "prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "~/server/errorHandler";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("pageSlug");
  const withPosts = req.nextUrl.searchParams.get("withPosts");
  const parentSlug = req.nextUrl.searchParams.get("parentSlug");

  let response;
  const filters = {} as {
    where?: {};
    include?: {};
  };

  try {
    if (slug) {
      filters.where = { slug };
      filters.include = { posts: withPosts === "true" };

      response = await prisma.page.findMany({ ...filters });
    } else if (parentSlug) {
      filters.where = { parentSlug };
      response = await prisma.posts.findMany({ ...filters });
    } else {
      response = await prisma.page.findMany({ ...filters });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    let response;

    if (data.parentSlug) {
      response = await prisma.posts.create({
        data,
      });
    } else {
      response = await prisma.page.create({
        data,
      });
    }

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest) {
  const { id, slug, metaTitle, metaDescription } = await req.json();

  try {
    const response = await prisma.page.update({
      where: {
        id,
      },
      data: {
        slug,
        metaTitle,
        metaDescription,
      },
    });

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest) {
  const id: string = await req.json();
  const deletePost = req.nextUrl.searchParams.get("deletePost");
  let response;

  try {
    if (deletePost === "true") {
      response = await prisma.posts.delete({
        where: {
          id: parseInt(id),
        },
      });
    } else {
      response = await prisma.page.delete({
        where: {
          id: parseInt(id),
        },
      });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
