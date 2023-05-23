import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Summary } from './summary.schema';

@Injectable()
export class SummariesService {
  constructor(
    @InjectModel(Summary.name) private readonly summaryModel: Model<Summary>,
  ) {}

  async create(highlightedText: string, summary: string) {
    const createdSummary = new this.summaryModel({
      highlightedText,
      summary,
    });
    return createdSummary.save();
  }

  async findAll() {
    return this.summaryModel.find().exec();
  }

  async findOne(id: string) {
    return this.summaryModel.findById(id).exec();
  }

  async update(id: string, summary: Partial<Summary>) {
    return this.summaryModel
      .findByIdAndUpdate(id, summary, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.summaryModel.findByIdAndRemove(id).exec();
  }
}
