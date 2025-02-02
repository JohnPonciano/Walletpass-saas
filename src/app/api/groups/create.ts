import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware } from "../../middlewares/authMiddleware";

export async function POST(req) {
  const user = authMiddleware(req);
  const { name } = await req.json();

  const group = await prisma.group.create({ data: { name } });
  return NextResponse.json(group);
}