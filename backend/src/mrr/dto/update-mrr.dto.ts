import { PartialType } from '@nestjs/swagger';
import { CreateMrrDto } from './create-mrr.dto';

export class UpdateMrrDto extends PartialType(CreateMrrDto) {}
