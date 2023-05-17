import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { UserCreateInput } from './models/user-create.input';
import { UserLoginInput } from './models/user-login.input';
import { UnauthorizedException } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  async getUser() {
    return null;
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: UserCreateInput) {
    const user = await this.userService.create(data);

    return user;
  }

  @Mutation(() => User)
  async loginUser(@Args('data') data: UserLoginInput) {
    const user = await this.userService.findByCredentials(data);

    if (!data) {
      return new UnauthorizedException();
    }

    return user;
  }
}
