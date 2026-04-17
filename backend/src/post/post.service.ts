import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(userId: string, data: any) {
    const { title, description, type } = data;
    return this.prisma.post.create({
      data: { userId, title, description, type }
    });
  }

  async getAllPosts() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, role: true, profile: { select: { branch: true, year: true } } } },
        _count: { select: { comments: true, savedBy: true } }
      }
    });
  }

  async addComment(userId: string, postId: string, content: string) {
    return this.prisma.comment.create({
      data: { userId, postId, content }
    }).catch(() => null);
  }

  async savePost(userId: string, postId: string) {
    return this.prisma.savedPost.create({
      data: { userId, postId }
    }).catch(() => null);
  }
}
