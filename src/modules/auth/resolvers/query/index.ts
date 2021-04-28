import { MutationSignUpArgs } from '../../../../graphql-codegen-types';
import { Auth } from '../../providers';
import { AppError } from '../../../../utils';
import { AuthenticatedUser } from '../../auth.module';

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
  { injector }: any
) {
  try {
    return await injector.get(AuthenticatedUser);
  } catch (error) {
    throw new AppError(error.message, error.code);
  }
}
export const query = { login, me };
