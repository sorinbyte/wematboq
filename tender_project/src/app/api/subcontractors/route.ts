import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const subs = await prisma.subcontractor.findMany({
      include: {
        specialties: {
          include: {
            workCategory: true,
          },
        },
        createdBy: true,
      },
    });

    return NextResponse.json(subs);
  } catch (err) {
    console.error(err);
    return new NextResponse("Eroare la obținerea subantreprenorilor", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      companyName,
      uniqueId,
      country,
      cityState,
      address,
      workTypes, // array of strings (workCategory codes)
    } = body;

    // TEMP: Hardcoded user ID for development/testing
    const userId = 1;

    // Get work category IDs for the given codes
    const workCategories = await prisma.workCategory.findMany({
      where: {
        code: { in: workTypes },
      },
    });

    const specialtiesData = workCategories.map((cat) => ({
      workCategoryId: cat.id,
    }));

    const newSubcontractor = await prisma.subcontractor.create({
      data: {
        companyName,
        uniqueId,
        addressLine: address,
        city: cityState.split("/")[0].trim(),
        state: cityState.split("/")[1]?.trim() || "",
        country,
        contactFirstName: firstName,
        contactLastName: lastName,
        contactEmail: email,
        contactPhone: phone,
        specialties: {
          create: specialtiesData,
        },
        createdById: userId,
      },
    });

    return NextResponse.json(newSubcontractor, { status: 201 });
  } catch (err) {
    console.error(err);
    return new NextResponse("Eroare la crearea subantreprenorului", { status: 500 });
  }
}