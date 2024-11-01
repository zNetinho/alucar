import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criação de um endereço
  const adress = await prisma.adress.create({
    data: {
      adress: 'Rua das Flores',
      number: 123,
      cep: '12345-678',
      telephone: '11987654321',
      reference: 'Próximo ao parque central',
    },
  });

  // Criação de um usuário com endereço associado
  const user = await prisma.user.create({
    data: {
      first_name: 'Antonio',
      last_name: 'Neto',
      password: 'senhaSegura123',
      email: 'antonio@example.com',
      adress: {
        connect: { id: adress.id },
      },
      cpf: '12345678901',
      status: 'ACTIVE',
    },
  });

  console.log({ user, adress });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
