const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany();
  console.log("USERS:", users.length);
  const connections = await prisma.connection.findMany();
  console.log("CONNECTIONS:", connections.length);
}
check().catch(console.error).finally(() => prisma.$disconnect());
