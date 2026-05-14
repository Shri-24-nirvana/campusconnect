const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany();
  console.log("Total users:", users.length);
  
  const connections = await prisma.connection.findMany();
  console.log("Total connections:", connections.length);
  
  const accepted = connections.filter(c => c.status === 'ACCEPTED');
  console.log("Accepted connections:", accepted.length);
  
  const pending = connections.filter(c => c.status === 'PENDING');
  console.log("Pending connections:", pending.length);
}
check().catch(console.error).finally(() => prisma.$disconnect());
