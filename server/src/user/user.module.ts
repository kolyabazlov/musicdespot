import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export class UserModule {}
