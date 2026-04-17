import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { QnaService } from './qna.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('qna')
export class QnaController {
  constructor(private readonly qnaService: QnaService) {}

  @Get()
  async getAllQuestions() {
    return this.qnaService.getAllQuestions();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createQuestion(@Request() req: any, @Body() body: any) {
    return this.qnaService.createQuestion(req.user.id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':questionId/answers')
  async addAnswer(@Request() req: any, @Param('questionId') questionId: string, @Body() body: any) {
    return this.qnaService.addAnswer(req.user.id, questionId, body.content);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':entityId/upvote')
  async toggleUpvote(@Request() req: any, @Param('entityId') entityId: string, @Body() body: any) {
    // Body should define type: 'QUESTION' or 'ANSWER'
    return this.qnaService.toggleUpvote(req.user.id, entityId, body.type);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('mentorship/:alumniId')
  async requestMentorship(@Request() req: any, @Param('alumniId') alumniId: string) {
    return this.qnaService.requestMentorship(req.user.id, alumniId);
  }
}
