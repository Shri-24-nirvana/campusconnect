import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RankingService {
  constructor(private prisma: PrismaService) {}

  async recalculateRank(userId: string) {
    // MVP logic: count posts and teams created
    const postCount = await this.prisma.post.count({ where: { userId } });
    const teamCount = await this.prisma.team.count({ where: { createdById: userId } });
    
    // Algorithm: 10xp per broadcast, 30xp per squad formed
    const score = (postCount * 10) + (teamCount * 30);

    let badge = 'Level 1 Node';
    if (score >= 30) badge = 'Junior Developer';
    if (score >= 100) badge = 'Elite Hacker';
    if (score >= 250) badge = 'System Architect';

    return this.prisma.ranking.upsert({
      where: { userId },
      update: { score, badge },
      create: { userId, score, badge }
    });
  }

  async getLeaderboard() {
    // Ensures all existing user rankings are correctly pulled in descending order
    return this.prisma.ranking.findMany({
      orderBy: { score: 'desc' },
      take: 20,
      include: { user: { select: { name: true, role: true } } }
    });
  }

  async getUserRank(userId: string) {
    // Synchronously pull rank directly
    const rank = await this.prisma.ranking.findUnique({
      where: { userId },
      include: { user: { select: { name: true } } }
    });

    if (!rank) {
       return this.recalculateRank(userId);
    }
    return rank;
  }
}
