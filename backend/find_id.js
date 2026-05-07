const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const targetId = '9bcf5365-f4a2-454f-8f55-85ec37dd060b';
  
  const models = [
    { name: 'Profile', include: { user: true } },
    { name: 'Post', include: { user: true } },
    { name: 'Team', include: { createdBy: true } },
    { name: 'TeamMember', include: { user: true } },
    { name: 'Question', include: { user: true } },
    { name: 'Answer', include: { user: true } },
    { name: 'Vote', include: { user: true } },
    { name: 'Ranking', include: { user: true } },
    { name: 'Connection', include: { sender: true, receiver: true } },
    { name: 'Message', include: { sender: true, receiver: true } },
    { name: 'Comment', include: { user: true } },
    { name: 'SavedPost', include: { user: true } },
    { name: 'MentorshipRequest', include: { sender: true, alumni: true } }
  ];

  for (const model of models) {
    try {
      // @ts-ignore
      const result = await prisma[model.name.toLowerCase()].findUnique({
        where: { id: targetId },
        include: model.include
      });

      if (result) {
        console.log(`\nFound ID in table: ${model.name}`);
        console.log(JSON.stringify(result, null, 2));
        return;
      }
    } catch (e) {
      // Ignored
    }
  }

  console.log('ID not found in any table.');
}

run().finally(() => prisma.$disconnect());
