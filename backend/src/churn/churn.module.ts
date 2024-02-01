import { Module } from '@nestjs/common';
import { ChurnRateService } from './churn.service';
import { ChurnRateController } from './churn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChurnRateEntity } from './entities/churn.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChurnRateEntity, UserEntity])],
  controllers: [ChurnRateController],
  providers: [ChurnRateService],
})
export class ChurnModule {}
