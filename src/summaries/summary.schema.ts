import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Summary extends Document {
  @Prop({ required: true })

  @Prop({ required: true })
  highlightedText: string;

  @Prop({ required: true })
  summary: string;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);
