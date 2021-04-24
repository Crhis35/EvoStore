import { MutationSignUpArgs } from '../../../../graphql-codegen-types';
import { Auth } from '../../providers';
import { AppError } from '../../../../utils';

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
export const mutation = { signUp };
