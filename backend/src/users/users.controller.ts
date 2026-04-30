import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('directory')
  async getDirectory(@Request() req: any) {
    // Fetch all users except the logged-in user
    const users = await this.prisma.user.findMany({
      where: {
        id: { not: req.user.id }
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profile: true
      }
    });
    return users;
  }
}
