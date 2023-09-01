import prisma from "@/libs/prisma";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { name, description } = body;
    const newCategory = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    return NextResponse.json(newCategory);
  } catch (error) {
    return NextResponse.json({ message: "POST error", error }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ message: "GET error", error }, { status: 500 });
  }
};
