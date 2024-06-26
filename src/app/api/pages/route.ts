import { prisma } from "prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "~/server/errorHandler";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("pageSlug");
  const withPosts = req.nextUrl.searchParams.get("withPosts");

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
    const response = await prisma.page.create({
      data,
    });

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
  const id = req.nextUrl.searchParams.get("pageId");
  let response;
  try {
    if (id) {
      response = await prisma.page.delete({
        where: {
          id: Number(id),
        },
      });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
