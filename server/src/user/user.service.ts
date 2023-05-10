import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from './models/user.model';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // ts
  async createUser(data): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
