import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { getAdressInfoPerCEP } from 'src/common/services/consulta-cep';
import { AdressApi } from 'src/common/types/adress-api';
import { emailRegex } from 'src/constants/regex/email';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly prisma: PrismaService,
  ) {}

  async create(createUserDto: User) {
    if (!createUserDto) {
      throw new HttpException('Please, inform your data', 400);
    }

    const { first_name, last_name, email, password, cpf } = createUserDto;

    const validateData = UserService.validateData({
      first_name,
      last_name,
      email,
      password,
      cpf,
    });

    if (validateData !== true) {
      throw new HttpException(validateData, HttpStatus.BAD_REQUEST);
    }

    // Generate a salt for password hashing
    const salt = genSaltSync(10);
    // Hash the password using the generated salt
    const hash = hashSync(createUserDto.password, salt);

    const infoAdress: AdressApi = await getAdressInfoPerCEP(
      createUserDto.Adress.cep,
    );
    // Transaction to ensure consistency
    return await this.prisma.$transaction(async () => {
      const adress = await this.prisma.adress.create({
        data: {
          adress: infoAdress.logradouro,
          number: createUserDto.Adress.number,
          cep: infoAdress.cep,
          telephone: createUserDto.Adress.telephone,
          reference: createUserDto.Adress.reference,
        },
      });

      const user = await this.prisma.user.create({
        data: {
          first_name: createUserDto.first_name,
          last_name: createUserDto.last_name,
          password: hash,
          email: createUserDto.email,
          cpf: createUserDto.cpf,
          adress: {
            connect: { id: adress.id },
          },
          adress_id: adress.id,
          status: 'ACTIVE',
        },
      });
      return user;
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      // Tells you which properties to take
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        cpf: true,
        adress: {
          select: {
            adress: true,
            number: true,
            cep: true,
            telephone: true,
            reference: true,
          },
        },
      },
    });
    if (!users) {
      {
        throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
      }
    }
    return users;
  }

  async findOne(id: string) {
    const users = await this.prisma.user.findUnique({
      where: { id },
      // Tells you which properties to take
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        cpf: true,
        adress: {
          select: {
            adress: true,
            number: true,
            cep: true,
            telephone: true,
            reference: true,
          },
        },
      },
    });
    if (!users) {
      {
        throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
      }
    }
    return users;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      // Tells you which properties to take
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        cpf: true,
        adress: {
          select: {
            adress: true,
            number: true,
            cep: true,
            telephone: true,
            reference: true,
          },
        },
      },
    });
    if (!user) {
      return updateUserDto;
    }
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  static validateData({ first_name, last_name, email, password, cpf }) {
    if (!email || !password || !first_name || !last_name || !cpf) {
      return 'Todos os campos são obrigatórios';
    }

    if (password.length < 6) {
      return 'A senha deve conter pelo menos 6 caracteres';
    }

    if (email.length < 6 || email.match(emailRegex) !== null || undefined) {
      return 'O email precisa ser válido, conter pelo menos o caracter "@" e ter pelo menos 6 caracteres';
    }
    return true;
  }
}
