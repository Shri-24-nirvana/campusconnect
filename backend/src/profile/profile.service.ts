import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: { user: { select: { name: true, email: true, role: true } } }
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async updateProfile(userId: string, data: any) {
    const { bio, branch, year, skills, projects, achievements, linkedin, github } = data;
    return this.prisma.profile.upsert({
      where: { userId },
      update: { bio, branch, year, skills, projects, achievements, linkedin, github },
      create: { userId, bio, branch, year, skills, projects, achievements, linkedin, github }
    });
  }
}
