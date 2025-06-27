import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Update path if needed

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: Number(params.id) },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}