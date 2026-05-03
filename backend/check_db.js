const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDb() {
  const messages = await prisma.message.findMany();
  console.log('Messages count:', messages.length);
  if (messages.length > 0) {
     console.log(messages[messages.length - 1]);
  }
}
checkDb().finally(() => prisma.$disconnect());
