import { NextRequest, NextResponse } from "next/server";
import { prisma } from "prisma/client";
import { handleError } from "~/server/errorHandler";

export async function GET(req: NextRequest) {
  //pagination
  const page = req.nextUrl.searchParams.get("page") || "1";
  const limit = req.nextUrl.searchParams.get("limit") || "5";

  const skip = page === "1" ? 0 : (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const slug = req.nextUrl.searchParams.get("pageSlug");
  const withPosts = req.nextUrl.searchParams.get("withPosts");

  let response;
  const filters = { skip, take } as {
    where?: {};
    include?: {};
  };

  try {
    const totalCount = await prisma.page.count();
    const hasNextPage = skip + take < totalCount;
    const hasPrevPage = skip > 0;

    if (slug) {
      filters.where = { slug };
      filters.include = { posts: withPosts === "true" };
      response = await prisma.page.findMany({ ...filters });
    } else {
      response = await prisma.page.findMany({ ...filters });
    }

    return NextResponse.json(
      {
        paginationArgs: { page, limit, hasNextPage, hasPrevPage, totalCount },
        data: response,
      },
      { status: 200 }
    );
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
