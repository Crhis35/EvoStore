import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { AuthenticatedUser } from '../auth.module';
import { AppError } from '../../../utils';
import { environment } from '../../../environment';
import AuthProvider from '../models';
import jwt from 'jsonwebtoken';

export class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type: any) {
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.requires;
  }
  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  visitFieldDefinition(field: any, details: any) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.requires;
  }

  ensureFieldsWrapped(objectType: any) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args: any) {
        // Get the required Role from the field first, falling back
        // to the objectType if no Role is required by the field:
        const requiredRole =
          field._requiredAuthRole || objectType._requiredAuthRole;

        if (!requiredRole) {
          return resolve.apply(this, args);
        }

        const ctx = args[2];
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
        if (currentUser?.role !== requiredRole) {
          throw new AppError('Not authorized', '404');
        }
        ctx.currentUser = currentUser;
        return resolve.apply(this, args);
      };
    });
  }
}
