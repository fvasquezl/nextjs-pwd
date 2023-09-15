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

const ITEMS_PER_PAGE = 10;

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  // const page = searchParams.get("page") || 1;

  const first = await prisma.category.findFirst();

  const take = +(searchParams.get("take") ?? 0);
  const cursor = searchParams.get("cursor") || first?.id;

  try {
    const categories = await prisma.category.findMany({
      take: take,
      skip: 1,
      cursor: {
        id: cursor,
      },
      orderBy: {
        id: "asc",
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ message: "GET error", error }, { status: 500 });
  }
};
