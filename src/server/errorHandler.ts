// src/server/errorHandler.ts
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export function handleError(error: unknown) {
  console.error("Error:", error);

  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return NextResponse.json(
          { error: "Resource already exists." },
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
