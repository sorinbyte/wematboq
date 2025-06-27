// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const workCategories = [
  { code: "210", label: "Demolări" },
  { code: "220", label: "Pregătire teren" },
  { code: "310", label: "Structură" },
  { code: "320", label: "Zidărie" },
  { code: "330", label: "Tencuieli" },
  { code: "340", label: "Finisaje" },
  { code: "350", label: "Izolații" },
  { code: "360", label: "Acoperișuri" },
  { code: "410", label: "Instalații electrice" },
  { code: "420", label: "Instalații sanitare" },
  { code: "430", label: "HVAC" },
  { code: "440", label: "Ventilație" },
  { code: "450", label: "Rețele exterioare" },
  { code: "460", label: "Securitate & Date" },
  { code: "510", label: "Mobilier" },
  { code: "520", label: "Echipamente speciale" },
];

async function main() {
  console.log("🌱 Seeding work categories...");
  await prisma.workCategory.createMany({
    data: workCategories,
    skipDuplicates: true,
  });

  const allCategories = await prisma.workCategory.findMany();
  const subcontractors = await prisma.subcontractor.findMany();

  console.log("🔁 Assigning specialties to subcontractors...");
  for (const sc of subcontractors) {
    const shuffled = allCategories.sort(() => 0.5 - Math.random()).slice(0, 2);
    for (const cat of shuffled) {
      await prisma.specialityOnSubcontractor.create({
        data: {
          subcontractorId: sc.id,
          workCategoryId: cat.id,
        },
      });
    }
  }
  console.log("✅ Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
