import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Summary extends Document {
  @Prop({ required: true })
  @Prop({ required: true })
  highlightedText: string;

  @Prop({ required: true })
  summary: string;

  @Prop({ required: true })
  createdAt: Date;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
