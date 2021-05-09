import { SchemaDirectiveVisitor } from 'apollo-server-express';
import {
  defaultFieldResolver,
  DirectiveLocation,
  GraphQLDirective,
  GraphQLList,
} from 'graphql';
import { AppError } from '../../../utils';
import { environment } from '../../../environment';
import AuthProvider from '../models';
import jwt from 'jsonwebtoken';

const ensureAuthenticated = async (ctx: GraphQLModules.GlobalContext) => {
  const req = ctx.request;
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
    throw new AppError('The user belong to this token does not exist', '401');
  ctx.currentUser = currentUser;
};

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args: any) {
      const [, , context] = args;
      await ensureAuthenticated(context);
      return resolve.apply(this, args);
    };
  }
}
export class HasRoleDirective extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName: any, schema: any) {
    return new GraphQLDirective({
      name: 'hasRole',
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {
        roles: {
          type: new GraphQLList(schema.getType('Role')),
        },
      },
    });
  }
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;
    const roles = this.args.roles;
    field.resolve = async function (...args: any) {
      const [, , context] = args;

      await ensureAuthenticated(context);
      const userRoles = context.currentUser.role;
      if (roles.some((role: string) => userRoles.indexOf(role) !== -1)) {
        const result = await resolve.apply(this, args);
        return result;
      }
      throw new AppError('You are not authorized for this resource', '404');
    };
  }
}
