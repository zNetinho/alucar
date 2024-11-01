import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * This method is called by Nest after the module is initialized.
   * It is used to connect to the Prisma database.
   * @returns {Promise<void>}
   */
  async onModuleInit(): Promise<void> {
    // Connect to the Prisma database
    await this.$connect();
  }
}
