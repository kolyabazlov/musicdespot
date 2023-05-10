import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [],
  providers: [PrismaService, UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
