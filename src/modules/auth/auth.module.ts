import {
  createModule,
  gql,
  InjectionToken,
  Scope,
  CONTEXT,
} from 'graphql-modules';
import jwt from 'jsonwebtoken';

import { typeDefs } from './type-defs';
import { resolvers } from './resolvers';
import { Auth } from './providers';

interface AuthenticatedUser {
  _id: number;
  username: string;
}
export const AuthenticatedUser = new InjectionToken<AuthenticatedUser>(
  'authenticated-user'
);

const signToken = (id: string) =>
  jwt.sign({ id }, 'keys.jwtSecret', { expiresIn: '1d' });

export const AuthModule = createModule({
  id: 'auth',
  dirname: __dirname,
  typeDefs,
  resolvers,
  providers: [
    Auth,
    {
      provide: AuthenticatedUser,
      scope: Scope.Operation,
      deps: [CONTEXT],
      global: true,
      useFactory: async (ctx: GraphQLModules.GlobalContext) => {
        const authHeader = ctx.request.headers.authorization;
        console.log({ authHeader });
        return {
          _id: 1,
          username: 'me',
        };
      },
    },
  ],
});
