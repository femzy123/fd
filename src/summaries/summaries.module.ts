import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummariesService } from './summaries.service';
import { SummariesController } from './summaries.controller';
import { Summary, SummarySchema } from './summary.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([{ name: Summary.name, schema: SummarySchema }]),
  ],
  controllers: [SummariesController],
  providers: [SummariesService],
})
export class SummariesModule {}
