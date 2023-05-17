import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * Input type for create user mutation.
 */
@InputType()
export class UserCreateInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { nullable: false })
  email: string;

  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  password: string;
}
