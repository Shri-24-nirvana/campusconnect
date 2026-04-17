import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';
import { TeamModule } from './team/team.module';
import { RankingModule } from './ranking/ranking.module';
import { QnaModule } from './qna/qna.module';

@Module({
  imports: [AuthModule, UsersModule, ProfileModule, PostModule, TeamModule, RankingModule, QnaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
