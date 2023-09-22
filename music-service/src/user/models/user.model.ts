import {
  Field,
  GraphQLISODateTime,
  HideField,
  ID,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType({})
export class User {
  @Field(() => ID, {
    nullable: true,
  })
  id: number;

  @Field(() => String, {
    nullable: false,
  })
  email!: string;

  @HideField()
  password!: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
  })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
  })
  updatedAt: Date;
}
