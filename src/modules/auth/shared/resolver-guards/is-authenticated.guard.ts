import { AuthenticationError } from 'apollo-server-express';

/**
 * Validate if current user is authenticated.
 */
export const isAuthenticated = () => (next: any) => async (
  root: any,
  args: any,
  context: any,
  info: any
): Promise<any> => {
  if (!context.injector.get(AuthProvider).isAuthenticated()) {
    throw new AuthenticationError('Authentication required. ');
  }

  return next(root, args, context, info);
};
