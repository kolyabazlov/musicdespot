import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { CreateInput } from './models/create.modal';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  async getUser() {
    return null;
  }

  @Mutation(() => User)
  async create(
    // ts
    @Args('data') data: CreateInput,
  ) {
    const user = await this.userService.create(data);

    return user;
  }
}
