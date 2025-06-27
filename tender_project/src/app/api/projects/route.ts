import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


export async function GET() {
  const projects = await prisma.project.findMany({
    include: {
      createdBy: true,
    },
    orderBy: { added: "desc" },
  });

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const project = await prisma.project.create({
      data: {
        projectname: body.projectname,
        client: body.client,
        projectvalue: body.projectvalue,
        country: body.country,
        city: body.city,
        addressLine: body.addressLine,
        projectstart: body.projectstart,
        projectend: body.projectend,
        createdById: 1, // Replace with real user ID
      },
    });

    return new Response(JSON.stringify(project), { status: 200 });
  } catch (err: any) {
    if (
      err instanceof PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return new Response(
        JSON.stringify({ error: "Numele proiectului există deja." }),
        { status: 409 }
      );
    }

    return new Response(JSON.stringify({ error: "Eroare server." }), {
      status: 500,
    });
  }
}