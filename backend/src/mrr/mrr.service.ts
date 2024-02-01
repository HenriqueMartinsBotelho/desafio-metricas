import { Injectable, NotFoundException } from '@nestjs/common';
import * as csv from 'csv-parser';
import { CreateMrrDto } from './dto/create-mrr.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MrrMetricsEntity } from './entities/mrr.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Readable } from 'typeorm/platform/PlatformTools';

@Injectable()
export class MrrService {
  constructor(
    @InjectRepository(MrrMetricsEntity)
    private metricsRepository: Repository<MrrMetricsEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async calculateMrrFromCsv(
    file: Express.Multer.File,
    mes: string,
    userId: number,
  ): Promise<number> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const results: CreateMrrDto[] = [];
    await new Promise<void>((resolve, reject) => {
      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null);

      stream
        .pipe(csv())
        .on('data', (data: CreateMrrDto) => {
          const transformedData = { ...data, mes };
          results.push(transformedData);
        })
        .on('end', () => resolve())
        .on('error', (error) => reject(error));
    });

    const mrr = this.calculateMrr(results);

    const existingMetric = await this.metricsRepository.findOne({
      where: {
        user: { id: userId },
        mes: mes,
      },
    });

    if (existingMetric) {
      existingMetric.mrr = mrr;
      await this.metricsRepository.save(existingMetric);
    } else {
      const metric = this.metricsRepository.create({ user, mes, mrr });
      await this.metricsRepository.save(metric);
    }

    return mrr;
  }

  async getMetricsByUserAndMonth(
    userId: number,
    mes: string,
  ): Promise<MrrMetricsEntity[]> {
    return await this.metricsRepository.find({
      where: {
        user: { id: userId },
        mes: mes,
      },
      relations: ['user'],
    });
  }

  private calculateMrr(subscriptions: CreateMrrDto[]): number {
    let mrr = 0;
    subscriptions.forEach((subscription) => {
      if (subscription.statusDaAssinatura.toLowerCase() === 'ativa') {
        mrr += Number(subscription.valorDaAssinatura);
      }
    });
    return mrr;
  }

  async findResourceById(id: number): Promise<MrrMetricsEntity> {
    const resource = await this.metricsRepository.findOne({
      where: { id },
    });

    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }
    return resource;
  }
}
