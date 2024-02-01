import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class ReturnUserDto {
  @ApiProperty({ description: 'ID do usuário' })
  id: number;

  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '+5511999999999',
  })
  phone: string;

  @ApiProperty({ description: 'CPF do usuário', example: '123.456.789-09' })
  cpf: string;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
  }
}
