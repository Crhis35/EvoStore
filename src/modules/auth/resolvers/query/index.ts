import { MutationSignUpArgs } from '../../../../graphql-codegen-types';
import { Auth } from '../../providers';
import { AppError } from '../../../../utils';
import { AuthenticatedUser } from '../../auth.module';
import { isRegExp } from 'node:util';

export async function login(
  obj: any,
  { input }: MutationSignUpArgs,
  { injector, response }: any
) {
  try {
    return await injector.get(Auth).login(input, response);
  } catch (error) {
    throw new AppError(error.message, error.code);
  }
}
export async function me(
  obj: any,
  { input }: MutationSignUpArgs,
  { injector, currentUser }: any
) {
  if (!currentUser) return new AppError('Faild on load user', '401');
  return currentUser;
}
export const query = { login, me };
