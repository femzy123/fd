import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { SummariesModule } from './summaries/summaries.module';

@Module({
  imports: [OpenaiModule, SummariesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
