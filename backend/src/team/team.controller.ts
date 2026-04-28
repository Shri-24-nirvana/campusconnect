import { Controller, Get, Post, Delete, Body, UseGuards, Request, Param } from '@nestjs/common';
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
  @Get('my-teams')
  async getMyTeams(@Request() req: any) {
    return this.teamService.getMyTeams(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('join/:teamId')
  async joinTeam(@Request() req: any, @Param('teamId') teamId: string) {
    return this.teamService.requestJoin(req.user.id, teamId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteTeam(@Request() req: any, @Param('id') teamId: string) {
    return this.teamService.deleteTeam(req.user.id, teamId);
  }
}
