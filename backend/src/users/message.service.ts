import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(senderId: string, receiverId: string, content: string) {
    return this.prisma.message.create({
      data: { senderId, receiverId, content }
    });
  }

  async getMessages(userId: string, partnerId: string) {
    return this.prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: partnerId },
          { senderId: partnerId, receiverId: userId }
        ]
      },
      orderBy: { createdAt: 'asc' }
    });
  }
}
