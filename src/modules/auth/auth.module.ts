import 'graphql-import-node';

import { createModule, InjectionToken, Scope, CONTEXT } from 'graphql-modules';
import jwt from 'jsonwebtoken';

import typeDefs from './type-defs/schema.graphql';
import { resolvers } from './resolvers';
import { Auth } from './providers';
import { AppError } from '../../utils';
import { environment } from '../../environment';
import AuthProvider, { IAuthProvider } from './models';

interface AuthenticatedUser {
  _id: number;
  username: string;
}
export const AuthenticatedUser = new InjectionToken<AuthenticatedUser>(
  'authenticated-user'
);

export interface IVerifiedUserType {
  id: number;
  iat: number;
  exp: number;
}

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
      useFactory: async (
        ctx: GraphQLModules.GlobalContext
      ): Promise<IAuthProvider> => {
        const req = ctx.request;
        const res = ctx.response;
        //1) Getting token and check if it's there
        let token;
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith('Bearer')
        ) {
          token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
          token = req.cookies.jwt;
        }
        if (!token) {
          throw new AppError(
            'You are not logged in! Please log in to get access',
            '401'
          );
        }
        //2) validate token
        const decoded = <any>jwt.verify(token, environment.jwtSecret);

        //3) check if user still exits
        const currentUser = await AuthProvider.findById(decoded.id);
        if (!currentUser)
          throw new AppError(
            'The user belonging to this token does not exits',
            '401'
          );
        //4) check if user changed password after the token was issued
        // if (currentUser.changedPasswordAfter(decoded.iat)) {
        //   return new AppError(
        //     'User recently changed password! Please log in again',
        //     '401'
        //   );
        // }

        //Grant access to protected route
        req.user = currentUser;
        res.locals.user = currentUser;

        return currentUser;
      },
    },
  ],
});
