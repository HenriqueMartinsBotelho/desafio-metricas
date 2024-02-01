import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { MrrService } from './mrr.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('mrr')
export class MrrController {
  constructor(private readonly mrrService: MrrService) {}

  @Get('metrics')
  async getMetrics(@Query('userId') userId: number, @Query('mes') mes: string) {
    return this.mrrService.getMetricsByUserAndMonth(userId, mes);
  }

  @Post('/calculate')
  @UseInterceptors(FileInterceptor('file'))
  async calculateMrr(
    @UploadedFile() file: Express.Multer.File,
    @Query('userId') userId: number,
    @Query('mes') mes: string,
  ) {
    return this.mrrService.calculateMrrFromCsv(file, mes, userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.mrrService.findResourceById(id);
  }
}
