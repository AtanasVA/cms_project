import { prisma } from "prisma/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("pageId");
  const filters = {} as { where?: { id: number } };

  try {
    if (id) {
      filters.where = { id: Number(id) };
    }

    const response = await prisma.page.findMany({ ...filters });

    return Response.json(response);
  } catch (error) {
    return Response.json(error);
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const response = await prisma.page.create({
      data,
    });

    return Response.json(response);
  } catch (error) {
    return Response.json(error);
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

    return Response.json(response);
  } catch (error) {
    return Response.json(error);
  }
}

export async function DELETE(req: NextRequest) {
  const id = await req.json();

  try {
    const response = await prisma.page.delete({
      where: {
        id,
      },
    });

    return Response.json(response);
  } catch (error) {
    return Response.json(error);
  }
}
