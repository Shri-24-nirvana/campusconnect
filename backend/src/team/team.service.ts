import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async createTeam(userId: string, data: any) {
    const { targetEvent, description } = data;
    return this.prisma.team.create({
      data: {
        createdById: userId,
        targetEvent,
        description,
        members: {
          create: [{ userId, role: 'LEADER', status: 'ACCEPTED' }]
        }
      }
    });
  }

  async getAllTeams() {
    return this.prisma.team.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: { select: { name: true } },
        members: { include: { user: { select: { name: true, role: true } } } }
      }
    });
  }

  async requestJoin(userId: string, teamId: string) {
      return this.prisma.teamMember.create({
          data: {
              userId,
              teamId,
              role: 'MEMBER',
              status: 'PENDING'
          }
      }).catch(() => null); // mock teams might throw FK error, suppress it
  }
}
