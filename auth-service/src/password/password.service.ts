import { Injectable } from '@nestjs/common';
import { hash, compare, genSalt } from 'bcryptjs';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(); // first arg is "rounds" - btw what is rounds? possibly 16 is better
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const match = await compare(password, hashedPassword);

    return match;
  }
}
