import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('ai')
export class OpenaiController {
  constructor(private readonly openaiservice: OpenaiService) {}

  @Post('openaiResponse')
  @HttpCode(200)
  async generateGptResponse(@Body('text') text: string): Promise<string> {
    return this.openaiservice.generateResponse(text);
  }
}
