const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const teams = await prisma.team.findMany({
      include: { members: true }
  });
  console.log("Total Teams:", teams.length);
  if (teams.length > 0) {
      console.log("First Team Members:", teams[0].members.length);
      console.log("Team members:", teams[0].members);
  }
}
check().catch(console.error).finally(() => prisma.$disconnect());
