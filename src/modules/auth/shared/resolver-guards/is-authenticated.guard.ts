import { AuthenticationError } from 'apollo-server-express';
import { AuthenticatedUser } from '../../auth.module';

/**
 * Validate if current user is authenticated.
 */
export const isAuthenticated = (
  { root, args, context, info }: any,
  next: any
): Promise<any> => {
  if (!context.injector.get(AuthenticatedUser)) {
    throw new AuthenticationError('Authentication required. ');
  }

  return next(root, args, context, info);
};
