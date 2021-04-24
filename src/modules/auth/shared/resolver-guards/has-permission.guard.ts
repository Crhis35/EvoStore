import { ForbiddenError } from 'apollo-server-express';
import { AuthenticatedUser } from '../../auth.module';

export const hasPermission = (permissions: string[]): any => (
  next: any
): any => async (
  root: any,
  args: any,
  context: any,
  info: any
): Promise<any> => {
  if (!context.injector.get(AuthenticatedUser).hasPermission(permissions)) {
    throw new ForbiddenError('Permissions required. ');
  }

  return next(root, args, context, info);
};
