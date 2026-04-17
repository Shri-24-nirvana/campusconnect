import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
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

  @UseGuards(AuthGuard('jwt'))
  @Post(':postId/comment')
  async addComment(@Request() req: any, @Param('postId') postId: string, @Body() body: any) {
    return this.postService.addComment(req.user.id, postId, body.content);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':postId/save')
  async savePost(@Request() req: any, @Param('postId') postId: string) {
    return this.postService.savePost(req.user.id, postId);
  }
}
