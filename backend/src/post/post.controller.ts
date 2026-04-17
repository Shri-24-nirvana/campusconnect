import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get() // Public feed
  async getAllPosts() {
    return this.postService.getAllPosts();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post() // Protected route
  async createPost(@Request() req: any, @Body() body: any) {
    return this.postService.createPost(req.user.id, body);
  }
}
