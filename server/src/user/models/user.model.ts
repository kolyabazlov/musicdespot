import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({})
export class User {
  @Field(() => ID, {
    nullable: false,
  })
  id!: number;

  @Field(() => String, {
    nullable: false,
  })
  email!: string;

  @Field(() => String, {
    nullable: false,
  })
  name!: string;

  @Field(() => GraphQLISODateTime, {
    nullable: false,
  })
  createdAt!: Date;

  @Field(() => GraphQLISODateTime, {
    nullable: false,
  })
  updatedAt!: Date;
}
