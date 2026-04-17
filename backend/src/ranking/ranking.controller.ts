import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get('leaderboard')
  async getLeaderboard() {
    return this.rankingService.getLeaderboard();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMyRank(@Request() req: any) {
    return this.rankingService.getUserRank(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('recalculate')
  async recalculateMyRank(@Request() req: any) {
    return this.rankingService.recalculateRank(req.user.id);
  }
}
