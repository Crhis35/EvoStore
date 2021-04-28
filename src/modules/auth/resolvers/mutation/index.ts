import {
  MutationSignUpArgs,
  MutationVerifiedArgs,
} from '../../../../graphql-codegen-types';
import { Auth } from '../../providers';
import { AppError } from '../../../../utils';
import { AuthenticatedUser } from '../../auth.module';

export async function signUp(
  obj: any,
  { input }: MutationSignUpArgs,
  { injector, request, response }: any
) {
  try {
    // const head = await injector.get(AuthenticatedUser);
    // if (!head.gg) return new AuthenticationError('Eroor');
    // console.log(args);

    return await injector.get(Auth).signUp(input, request, response);
  } catch (error) {
    throw new AppError(error.message, error.code);
  }
}
export async function verified(
  obj: any,
  { code }: MutationVerifiedArgs,
  { injector, request, response }: any
) {
  try {
    const currUser = await injector.get(AuthenticatedUser);
    // if (!head.gg) return new AuthenticationError('Eroor');
    // console.log(args);
    if (currUser.verifiedCode !== code)
      throw new AppError('Invalid code provided', '401');
    if (currUser.verified)
      throw new AppError("You're currently verifed", '404');
    return await injector.get(Auth).verified(currUser.id);
  } catch (error) {
    throw new AppError(error.message, error.code);
  }
}
export const mutation = { signUp, verified };
