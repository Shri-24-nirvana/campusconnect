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

  async deleteMessage(messageId: string, userId: string) {
    // Verify the message exists and user is either sender or receiver
    const message = await this.prisma.message.findUnique({ where: { id: messageId } });
    if (!message) return { success: false, message: 'Message not found' };
    
    if (message.senderId !== userId && message.receiverId !== userId) {
        return { success: false, message: 'Unauthorized' };
    }

    await this.prisma.message.delete({ where: { id: messageId } });
    return { success: true };
  }
}
