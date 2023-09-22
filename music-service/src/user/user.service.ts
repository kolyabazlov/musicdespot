import { Injectable } from '@nestjs/common';
import { PasswordService } from 'src/password/password.service';
import { PrismaService } from 'src/prisma.service';

// Service will be responsible for data storage and retrieval

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  // ts
  async create({ email, password }) {
    const hashedPassword = await this.passwordService.hashPassword(password);

    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async findByCredentials(data: { email: string; password: string }) {
    let user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    const match = await this.passwordService.comparePasswords(
      data.password,
      user.password,
    );

    console.log('m', user.password, data.password, match);

    if (!(user && match)) {
      // eslint-disable-next-line unicorn/no-null
      user = null;
    }

    return user;
  }
}
