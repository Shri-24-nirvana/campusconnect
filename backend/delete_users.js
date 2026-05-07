const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteUserSafely(userId) {
  try {
    console.log(`Starting deletion process for user: ${userId}`);

    // Delete Messages
    await prisma.message.deleteMany({
      where: { OR: [{ senderId: userId }, { receiverId: userId }] }
    });
    
    // Delete Connections
    await prisma.connection.deleteMany({
      where: { OR: [{ senderId: userId }, { receiverId: userId }] }
    });

    // Delete Team Memberships
    await prisma.teamMember.deleteMany({
      where: { userId }
    });

    // Delete Comments
    await prisma.comment.deleteMany({
      where: { userId }
    });

    // Delete Saved Posts
    await prisma.savedPost.deleteMany({
      where: { userId }
    });

    // Delete Posts
    await prisma.post.deleteMany({
      where: { userId }
    });

    // Delete Profile
    await prisma.profile.deleteMany({
      where: { userId }
    });

    // Delete Ranking
    await prisma.ranking.deleteMany({ where: { userId } });

    // Delete Votes
    await prisma.vote.deleteMany({ where: { userId } });

    // Delete Answers
    await prisma.answer.deleteMany({ where: { userId } });

    // Delete Questions
    await prisma.question.deleteMany({ where: { userId } });

    // Delete Teams created by user
    await prisma.team.deleteMany({ where: { createdById: userId } });

    // Delete MentorshipRequests
    await prisma.mentorshipRequest.deleteMany({
      where: { OR: [{ senderId: userId }, { alumniId: userId }] }
    });

    // Finally delete User
    await prisma.user.delete({
      where: { id: userId }
    });

    console.log(`Successfully deleted user: ${userId}`);
  } catch (err) {
    console.error(`Error deleting user ${userId}:`, err);
  }
}

async function run() {
  const ujjawalPersonal = '613d9570-4bdd-41bb-821f-f4eaab787af5';

  await deleteUserSafely(ujjawalPersonal);
}

run().finally(() => prisma.$disconnect());
