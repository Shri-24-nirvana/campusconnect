import { Controller, Post, Put, Param, UseGuards, Request, Get } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('connections')
export class ConnectionController {
  constructor(private readonly connectionService: ConnectionService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':receiverId')
  async sendConnectionRequest(@Request() req: any, @Param('receiverId') receiverId: string) {
    return this.connectionService.sendRequest(req.user.id, receiverId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMyConnections(@Request() req: any) {
    return this.connectionService.getConnections(req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':connectionId/accept')
  async acceptConnection(@Request() req: any, @Param('connectionId') connectionId: string) {
    return this.connectionService.acceptRequest(req.user.id, connectionId);
  }
}
