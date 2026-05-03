import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ConnectionService {
  constructor(private prisma: PrismaService) {}

  async sendRequest(senderId: string, receiverId: string) {
    return this.prisma.connection.create({
      data: {
        senderId,
        receiverId,
        status: 'PENDING'
      }
    }).catch(() => null); // Catch unique constraint violations
  }

  async getConnections(userId: string) {
    return this.prisma.connection.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }]
      },
      include: {
        sender: { select: { id: true, name: true, profile: { select: { avatarUrl: true } } } },
        receiver: { select: { id: true, name: true, profile: { select: { avatarUrl: true } } } }
      }
    });
  }

  async acceptRequest(userId: string, connectionId: string) {
      return this.prisma.connection.updateMany({
          where: {
              id: connectionId,
              receiverId: userId,
              status: 'PENDING'
          },
          data: {
              status: 'ACCEPTED'
          }
      });
  }
}
