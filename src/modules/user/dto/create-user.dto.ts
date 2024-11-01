import { StatusUser } from 'src/common/enums/status-user.enum';

export class CreateUserDto {
  first_name: string;
  last_name: string;
  email: string;
  adress: string;
  number: number;
  cep: string;
  telephone: string;
  reference: string;
  id: number;
  cpf: string;
  status: StatusUser;
}
