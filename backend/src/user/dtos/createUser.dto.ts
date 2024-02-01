import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email do usuário', example: 'usuario@example.com' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Telefone do usuário', example: '+5511999999999' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'CPF do usuário', example: '123.456.789-09' })
  @IsString()
  cpf: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsString()
  password: string;
}
 