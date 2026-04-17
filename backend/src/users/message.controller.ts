import { Controller, Post, Param, Body, UseGuards, Request, Get } from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':receiverId')
  async sendMessage(@Request() req: any, @Param('receiverId') receiverId: string, @Body('content') content: string) {
    return this.messageService.sendMessage(req.user.id, receiverId, content);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':partnerId')
  async getChatHistory(@Request() req: any, @Param('partnerId') partnerId: string) {
    return this.messageService.getMessages(req.user.id, partnerId);
  }
}
