import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
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
}
