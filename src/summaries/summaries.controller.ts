import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { Summary } from './summary.schema';

@Controller('summaries')
export class SummariesController {
  constructor(private readonly summariesService: SummariesService) {}

  @Post()
  async create(
    @Body('highlightedText') highlightedText: string,
    @Body('summary') summary: string,
  ) {
    return this.summariesService.create(highlightedText, summary);
  }

  @Get()
  async findAll() {
    return this.summariesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const summary = await this.summariesService.findOne(id);
    if (!summary) {
      throw new NotFoundException('Summary not found');
    }
    return summary;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() summary: Partial<Summary>) {
    const updatedSummary = await this.summariesService.update(id, summary);
    if (!updatedSummary) {
      throw new NotFoundException('Summary not found');
    }
    return updatedSummary;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.summariesService.remove(id);
  }
}
