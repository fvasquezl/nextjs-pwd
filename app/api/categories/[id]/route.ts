import prisma from "@/libs/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ message: "GET error", error }, { status: 500 });
  }
};
export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await request.json();
    const { name, description } = body;

    const { id } = params;

    const updateCategory = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });

    if (!updateCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updateCategory);
  } catch (error) {
    return NextResponse.json(
      { message: "UPDATE error", error },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    await prisma.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json("Category has been deleted");
  } catch (error) {
    return NextResponse.json(
      { message: "DELETE error", error },
      { status: 500 }
    );
  }
};
