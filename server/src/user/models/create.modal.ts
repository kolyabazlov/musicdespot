import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * Input type for create user mutation.
 */
@InputType()
export class CreateInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { nullable: false })
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  @Field(() => String, { nullable: false })
  name: string;
}
