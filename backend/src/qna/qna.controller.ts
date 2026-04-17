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
}
