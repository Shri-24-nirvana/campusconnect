const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: 'vedika', mode: 'insensitive' } },
        { name: { contains: 'ujjawal', mode: 'insensitive' } },
        { name: { contains: 'ujjwal', mode: 'insensitive' } }, // handle spelling variation
        { name: { contains: 'rudra', mode: 'insensitive' } }
      ]
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  });
  console.log(users);
}
run().finally(() => prisma.$disconnect());
