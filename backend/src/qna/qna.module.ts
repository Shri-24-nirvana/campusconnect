import { Module } from '@nestjs/common';
import { QnaService } from './qna.service';
import { QnaController } from './qna.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [QnaController],
  providers: [QnaService, PrismaService],
})
export class QnaModule {}
