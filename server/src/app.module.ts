import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}

// @Module({
//   imports: [
//     RedisModule,
//     AuthModule,
//     UserModule,
//     SessionModule,
//   ],
// })
// export class AppModule {}

// @Module({
//   imports: [AuthModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .exclude(
//         { path: 'auth/login', method: RequestMethod.POST },
//         { path: 'auth/logout', method: RequestMethod.POST },
//       )
//       .forRoutes('*');
//   }
// }
