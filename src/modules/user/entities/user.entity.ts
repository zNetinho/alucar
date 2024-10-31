import { Adress } from 'src/common/entities/Adress.entity';
import { StatusUser } from 'src/common/enums/status-user.enum';

export class User {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  Adress: Adress;
  cpf: string;
  status: StatusUser;
}
