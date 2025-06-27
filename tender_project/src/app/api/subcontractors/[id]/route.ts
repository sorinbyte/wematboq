export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ Use correct signature: (req, context)
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10); // ✅ make sure this is assigned

  try {
    const subcontractor = await prisma.subcontractor.findUnique({
      where: { id }, // ✅ now this works
      include: {
        specialties: {
          include: {
            workCategory: true,
          },
        },
        createdBy: true,
      },
    });

    if (!subcontractor) {
      return new NextResponse("Subcontractor not found", { status: 404 });
    }

    return NextResponse.json(subcontractor);
  } catch (error) {
    console.error(error);
    return new NextResponse("Server error", { status: 500 });
  }
}