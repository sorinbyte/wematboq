// prisma/assignSpecialties.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function assignSpecialties() {
  const allCategories = await prisma.workCategory.findMany();
  const allSubcontractors = await prisma.subcontractor.findMany();

  for (const subcontractor of allSubcontractors) {
    const selectedCategories = getRandomItems(allCategories, 2); // Assign 2 specialties

    for (const category of selectedCategories) {
      await prisma.specialityOnSubcontractor.create({
        data: {
          subcontractorId: subcontractor.id,
          workCategoryId: category.id,
        },
      });
    }

    console.log(
      `✅ Subcontractor ${subcontractor.companyName} assigned ${selectedCategories
        .map((c) => c.code)
        .join(", ")}`
    );
  }

  console.log("🎉 Specialties assignment complete");
}

function getRandomItems<T>(arr: T[], n: number): T[] {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

assignSpecialties()
  .catch(console.error)
  .finally(() => prisma.$disconnect());