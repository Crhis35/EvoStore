import { ForbiddenError } from 'apollo-server-express';

import { AuthProvider } from '../../providers/auth.provider';
/**
 * Validate if current user has permission to proceed with the request.
 * @param permissions - List of permissions to validate.
 */
export const hasPermission = (permissions: string[]): any => (
  next: any
): any => async (
  root: any,
  args: any,
  context: any,
  info: any
): Promise<any> => {
  if (!context.injector.get(AuthProvider).hasPermission(permissions)) {
    throw new ForbiddenError('Permissions required. ');
  }

  return next(root, args, context, info);
};
