import { prisma } from "prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "~/server/errorHandler";

export async function GET(req: NextRequest) {
  const parentSlug = req.nextUrl.searchParams.get("parentSlug");

  let response;
  try {
    if (parentSlug) {
      response = await prisma.post.findMany({ where: { parentSlug } });
    }
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const response = await prisma.post.create({
      data,
    });

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: NextRequest) {
  const { postId: id, postContent }: { postId: number; postContent?: string } =
    await req.json();

  try {
    const response = await prisma.post.update({
      where: {
        id,
      },
      data: {
        postContent,
      },
    });

    return NextResponse.json({ data: response }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest) {
  const id: number = await req.json();

  try {
    const response = await prisma.post.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
