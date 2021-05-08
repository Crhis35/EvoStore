import { ForbiddenError } from 'apollo-server-express';
import { AppError } from '../../../../utils';
import { AuthenticatedUser } from '../../auth.module';

export const validateRole = (role: string) => (
  { root, args, context, info }: any,
  next: any
): Promise<any> => {
  if (context.injector.get(AuthenticatedUser).role !== role) {
    throw new AppError('Permissions required. ', '404');
  }

  return next(root, args, context, info);
};
