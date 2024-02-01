import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Email do usuário' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsString()
  password: string;
}
