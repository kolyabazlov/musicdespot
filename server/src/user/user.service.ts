import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // ts
  async create(data) {
    return this.prisma.user.create({
      data,
    });
  }

  async findByCredentials(data: { email: string; password: string }) {
    let user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!(user && user.password === data.password)) {
      // eslint-disable-next-line unicorn/no-null
      user = null;
    }

    return user;
  }
}
