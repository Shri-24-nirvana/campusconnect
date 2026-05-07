const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const user = await prisma.user.findUnique({
    where: { id: '9bcf5365-f4a2-454f-8f55-85ec37dd060b' },
    select: { name: true, email: true }
  });
  console.log(user);
}

run().finally(() => prisma.$disconnect());
