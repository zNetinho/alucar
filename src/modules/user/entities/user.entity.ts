import { IsEmail, IsNotEmpty } from 'class-validator';
import { Adress } from 'src/common/entities/Adress.entity';
import { StatusUser } from 'src/common/enums/status-user.enum';
import { Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  Adress: Adress;

  @Column()
  @Unique('cpf', ['cpf'])
  @IsNotEmpty()
  cpf: string;

  @Column()
  status: StatusUser;
}
