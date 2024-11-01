import { Adress } from 'src/common/entities/Adress.entity';
import { StatusUser } from 'src/common/enums/status-user.enum';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  Adress: Adress;

  @Column()
  cpf: string;

  @Column()
  status: StatusUser;
}
