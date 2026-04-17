import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QnaService {
  constructor(private prisma: PrismaService) {}

  async createQuestion(userId: string, data: any) {
    const { title, content } = data;
    return this.prisma.question.create({
      data: { userId, title, content }
    });
  }

  async getAllQuestions() {
    return this.prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, role: true } },
        answers: { 
          include: { user: { select: { name: true, role: true } } },
          orderBy: { upvotes: 'desc' }
        }
      }
    });
  }

  async addAnswer(userId: string, questionId: string, content: string) {
    return this.prisma.answer.create({
      data: { userId, questionId, content }
    });
  }

  async toggleUpvote(userId: string, entityId: string, type: string) {
      if(type === 'ANSWER') {
          return this.prisma.answer.update({
              where: { id: entityId },
              data: { upvotes: { increment: 1 } }
          });
      }
      return null;
  }

  async requestMentorship(senderId: string, alumniId: string) {
      return this.prisma.mentorshipRequest.create({
          data: {
              senderId,
              alumniId,
              status: 'PENDING'
          }
      });
  }
}
