import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChurnRateEntity } from './entities/churn.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateChurnRateDto } from './dto/create-churn.dto';
import * as csv from 'csv-parser';
import { Readable } from 'typeorm/platform/PlatformTools';

@Injectable()
export class ChurnRateService {
  constructor(
    @InjectRepository(ChurnRateEntity)
    private churnRateRepository: Repository<ChurnRateEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async calculateChurnRateFromCsv(
    file: Express.Multer.File,
    mes: string,
    userId: number,
  ): Promise<number> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const subscriptions: CreateChurnRateDto[] = [];
    await new Promise<void>((resolve, reject) => {
      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null);

      stream
        .pipe(csv())
        .on('data', (data: CreateChurnRateDto) => {
          const transformedData = { ...data, mes };
          subscriptions.push(transformedData);
        })
        .on('end', () => resolve())
        .on('error', (error) => reject(error));
    });

    const churnRate = this.calculateChurnRate(subscriptions);

    const existingMetric = await this.churnRateRepository.findOne({
      where: {
        user: { id: userId },
        mes: mes,
      },
    });

    if (existingMetric) {
      existingMetric.churnRate = churnRate;
      await this.churnRateRepository.save(existingMetric);
    } else {
      const metric = this.churnRateRepository.create({ user, mes, churnRate });
      await this.churnRateRepository.save(metric);
    }

    return churnRate;
  }

  private calculateChurnRate(subscriptions: CreateChurnRateDto[]): number {
    const totalSubscriptionsAtStart = subscriptions.length;
    const churnedSubscriptions = subscriptions.filter(
      (sub) => sub.statusDaAssinatura.toLowerCase() === 'cancelada',
    ).length;

    return totalSubscriptionsAtStart === 0
      ? 0
      : (churnedSubscriptions / totalSubscriptionsAtStart) * 100;
  }

  async getChurnRate(userId: number, mes: string): Promise<ChurnRateEntity> {
    const metric = await this.churnRateRepository.findOne({
      where: {
        user: { id: userId },
        mes: mes,
      },
    });

    if (!metric) {
      throw new NotFoundException(
        `Churn rate not found for User ID ${userId} and month ${mes}`,
      );
    }

    return metric;
  }
}
