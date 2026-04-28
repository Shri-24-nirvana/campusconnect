import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async createTeam(userId: string, data: any) {
    const { name, targetEvent, description, invitedMemberIds = [] } = data;
    
    // Create the team and leader
    const team = await this.prisma.team.create({
      data: {
        name: name || "Unnamed Team",
        createdById: userId,
        targetEvent,
        description: description || "",
        members: {
          create: [{ userId, role: 'LEADER', status: 'ACCEPTED' }]
        }
      }
    });

    // Add invited members
    if (invitedMemberIds.length > 0) {
       const invites = invitedMemberIds.map((id: string) => ({
           teamId: team.id,
           userId: id,
           role: 'MEMBER',
           status: 'PENDING'
       }));
       await this.prisma.teamMember.createMany({ data: invites }).catch(() => {});
    }

    return team;
  }

  async getMyTeams(userId: string) {
    return this.prisma.team.findMany({
      where: {
        members: {
          some: { userId }
        }
      },
      include: {
        members: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async deleteTeam(userId: string, teamId: string) {
      // Ensure user is the leader/creator
      const team = await this.prisma.team.findUnique({ where: { id: teamId } });
      if (team && team.createdById === userId) {
         return this.prisma.team.delete({ where: { id: teamId } });
      }
      throw new Error("Unauthorized or team not found");
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
