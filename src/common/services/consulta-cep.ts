import { HttpException } from '@nestjs/common';

export async function getAdressInfoPerCEP(cep: string): Promise<any> {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.ok) {
      return await response.json();
    }
    if (!response) {
      return null;
    }
  } catch (error) {
    throw new HttpException('CEP inválido', 400);
  }
}
