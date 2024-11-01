import { StatusUser } from 'src/common/enums/status-user.enum';

export class CreateUserDto {
  id: number;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  Adress: {
    adress: string;
    number: number;
    cep: string;
    telephone: string;
    reference: string;
    id: number;
  };
  cpf: string;
  status: StatusUser;
}
