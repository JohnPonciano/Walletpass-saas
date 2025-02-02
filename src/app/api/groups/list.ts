import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware } from "@/middlewares/authMiddleware";

export async function GET(req) {
  const user = authMiddleware(req);
  const groups = await prisma.group.findMany({
    where: { users: { some: { userId: user.id } } },
  });
  return NextResponse.json(groups);
}
