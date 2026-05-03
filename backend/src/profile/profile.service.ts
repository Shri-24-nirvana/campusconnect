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
    const { name, bio, branch, year, collegeEmail, projects, achievements, linkedin, github, xProfile, instagram, resumeUrl, avatarUrl } = data;
    
    // Convert string array to Prisma String[] format if passed as a comma-separated string from UI inputs
    let skillsArray = data.skills;
    if (typeof skillsArray === 'string') {
        skillsArray = skillsArray.split(',').map(s => s.trim()).filter(Boolean);
    }

    const payload = { 
        bio, branch, year, collegeEmail, projects, achievements, linkedin, github, xProfile, instagram, resumeUrl, avatarUrl,
        skills: skillsArray 
    };

    if (name) {
       await this.prisma.user.update({
          where: { id: userId },
          data: { name }
       });
    }

    return this.prisma.profile.upsert({
      where: { userId },
      update: payload,
      create: { userId, ...payload },
      include: { user: { select: { name: true, email: true, role: true } } }
    });
  }
}
