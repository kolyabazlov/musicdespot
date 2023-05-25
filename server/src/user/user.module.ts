import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PasswordModule } from 'src/password/password.module';

@Module({
  imports: [PasswordModule],
  providers: [PrismaService, UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
