import {
  AuthenticationError,
  SchemaDirectiveVisitor,
} from 'apollo-server-express';
import { defaultFieldResolver, GraphQLField } from 'graphql';

const assertOwner = (user: any, data: any) => {
  if (user.id !== data.receiverId) {
    throw new AuthenticationError('You need to be the receiver of the message');
  }
};

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const requiredRole = this.args.requires;
    const originalResolve = field.resolve || defaultFieldResolver;

    field.resolve = async function (...args) {
      const context = args[2];
      const user = context.user || {};
      const requiresOwner = requiredRole === 'OWNER';
      const isUnauthorized = !requiresOwner && user.role !== requiredRole;

      if (isUnauthorized) {
        throw new AuthenticationError(
          `You need following role: ${requiredRole}`
        );
      }

      const data = await originalResolve.apply(this, args);

      if (requiresOwner) {
        assertOwner(user, data);
      }

      return data;
    };
  }
}

export default AuthDirective;
