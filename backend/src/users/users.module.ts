import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
import { ConnectionController } from './connection.controller';
import { ConnectionService } from './connection.service';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  controllers: [ConnectionController, MessageController],
  providers: [UsersService, PrismaService, ConnectionService, MessageService],
  exports: [UsersService],
})
export class UsersModule {}
