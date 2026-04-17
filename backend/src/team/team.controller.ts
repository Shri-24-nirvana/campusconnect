import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { TeamService } from './team.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async getAllTeams() {
    return this.teamService.getAllTeams();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createTeam(@Request() req: any, @Body() body: any) {
    return this.teamService.createTeam(req.user.id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('join/:teamId')
  async joinTeam(@Request() req: any, @Param('teamId') teamId: string) {
    return this.teamService.requestJoin(req.user.id, teamId);
  }
}
