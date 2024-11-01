import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  controllers: [UserController],
  imports: [PrismaModule, SupabaseModule],
  providers: [UserService],
})
export class UserModule {}
