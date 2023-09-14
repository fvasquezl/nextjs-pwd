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

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const cursor = +(searchParams.get("cursor") ?? 0);
  const pgsize = +(searchParams.get("pgsize") ?? 10);

  try {
    const categories = await prisma.category.findMany({
      pgsize,
      skip: 1,
      cursor: Prisma.CategoryWhereUniqueInput | undefined,
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ message: "GET error", error }, { status: 500 });
  }
};
