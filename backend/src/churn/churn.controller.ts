import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChurnRateService } from './churn.service';
import { ChurnRateEntity } from './entities/churn.entity';

@Controller('churn-rate')
export class ChurnRateController {
  constructor(private readonly churnRateService: ChurnRateService) {}

  @Post('/calculate')
  @UseInterceptors(FileInterceptor('file'))
  async calculateChurnRate(
    @UploadedFile() file: Express.Multer.File,
    @Query('userId') userId: number,
    @Query('mes') mes: string,
  ) {
    return this.churnRateService.calculateChurnRateFromCsv(file, mes, userId);
  }

  @Get('/rates')
  async getChurnRate(
    @Query('userId') userId: number,
    @Query('mes') mes: string,
  ): Promise<ChurnRateEntity> {
    return this.churnRateService.getChurnRate(userId, mes);
  }
}
