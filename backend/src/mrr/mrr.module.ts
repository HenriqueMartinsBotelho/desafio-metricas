import { Module } from '@nestjs/common';
import { MrrService } from './mrr.service';
import { MrrController } from './mrr.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MrrMetricsEntity } from './entities/mrr.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MrrMetricsEntity, UserEntity])],
  controllers: [MrrController],
  providers: [MrrService],
})
export class MrrModule {}
