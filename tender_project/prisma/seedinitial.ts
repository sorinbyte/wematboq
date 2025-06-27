import { PrismaClient, UserRole, ProjectStatus, ProjectValueRange } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear previous data (optional for dev)
  await prisma.offerItem.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.package.deleteMany();
  await prisma.boqRowField.deleteMany();
  await prisma.boqRow.deleteMany();
  await prisma.boq.deleteMany();
  await prisma.project.deleteMany();
  await prisma.subcontractor.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: 'adminpass',
      role: UserRole.admin,
      firstName: 'Admin',
      lastName: 'User',
    },
  });

  // Create Contractor
  const contractor = await prisma.user.create({
    data: {
      email: 'contractor@example.com',
      password: 'contractorpass',
      role: UserRole.contractor,
      firstName: 'John',
      lastName: 'Builder',
      companyName: 'BuildCorp',
    },
  });

  // Create Subcontractors + Users
  for (let i = 1; i <= 5; i++) {
    const subcontractorUser = await prisma.user.create({
      data: {
        email: `sub${i}@example.com`,
        password: 'subpass',
        role: UserRole.subcontractor,
        firstName: `Sub${i}`,
        lastName: `Contractor`,
      },
    });

    await prisma.subcontractor.create({
      data: {
        companyName: `SubCo ${i}`,
        uniqueId: `RO12345${i}`,
        addressLine: `Strada Exemplu ${i}`,
        city: 'București',
        state: 'Sector 1',
        country: 'Romania',
        contactFirstName: `Sub${i}`,
        contactLastName: `Contractor`,
        contactEmail: `sub${i}@example.com`,
        contactPhone: `+40 723 000 00${i}`,
        createdById: contractor.id,
        user: { connect: { id: subcontractorUser.id } },
      },
    });
  }

  // Create Projects
  for (let i = 1; i <= 5; i++) {
    await prisma.project.create({
      data: {
        projectname: `Project ${i}`,
        client: `Client ${i}`,
        projectvalue: [
          ProjectValueRange.EUR_0_250K,
          ProjectValueRange.EUR_250K_500K,
          ProjectValueRange.EUR_500K_1M,
          ProjectValueRange.EUR_1M_PLUS,
          ProjectValueRange.EUR_5M_PLUS,
        ][i % 5],
        projectstart: new Date(`2025-07-0${i}`),
        projectend: new Date(`2025-12-0${i}`),
        addressLine: `Bulevardul Constructorilor ${i}`,
        city: 'București',
        country: 'Romania',
        createdById: contractor.id,
      },
    });
  }

  console.log('✅ Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });