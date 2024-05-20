import { prisma } from "prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("pageId");
  const filters = {} as { where?: { id: number } };

  try {
    if (id) {
      filters.where = { id: Number(id) };
    }

    const response = await prisma.page.findMany({ ...filters });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching pages:", error);
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        default:
          return NextResponse.json(
            { error: "Database error occurred." },
            { status: 500 }
          );
      }
    } else if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON format." },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
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
    console.error("Error creating page:", error);
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          return NextResponse.json(
            { error: "Page with this slug already exists." },
            { status: 409 }
          );
        default:
          return NextResponse.json(
            { error: "Database error occurred." },
            { status: 500 }
          );
      }
    } else if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON format." },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
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
    console.error("Error updating page:", error);
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          return NextResponse.json(
            { error: "Page with this slug already exists." },
            { status: 409 }
          );
        default:
          return NextResponse.json(
            { error: "Database error occurred." },
            { status: 500 }
          );
      }
    } else if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON format." },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
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

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error deleting page:", error);
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        default:
          return NextResponse.json(
            { error: "Database error occurred." },
            { status: 500 }
          );
      }
    } else if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON format." },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
}
