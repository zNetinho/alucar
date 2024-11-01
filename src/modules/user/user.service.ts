import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto) return null;

    if (createUserDto) {
      console.log(createUserDto);
      if (
        !createUserDto.email ||
        !createUserDto.password ||
        !createUserDto.first_name ||
        !createUserDto.last_name ||
        !createUserDto.cpf
      ) {
        // If any of the fields are missing, throw an exception
        throw new HttpException(
          'Todos os campos são obrigatórios',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Transação para garantir consistência

      return await this.prisma.$transaction(async () => {
        const adress = await this.prisma.adress.create({
          data: {
            adress: createUserDto.Adress.adress,
            number: createUserDto.Adress.number,
            cep: createUserDto.Adress.cep,
            telephone: createUserDto.Adress.telephone,
            reference: createUserDto.Adress.reference,
          },
        });

        console.log(adress);

        const user = await this.prisma.user.create({
          data: {
            first_name: createUserDto.first_name,
            last_name: createUserDto.last_name,
            password: createUserDto.password,
            email: createUserDto.email,
            cpf: createUserDto.cpf,
            adress: {
              connect: { id: adress.id },
            },
            adress_id: adress.id,
            status: 'ACTIVE',
          },
        });
        return `This action adds a new user ${user}`;
      });
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    if (!users) {
      {
        throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
      }
    }
    return `This action returns all users ${users[0].first_name}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
