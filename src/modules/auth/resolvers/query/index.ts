import {
  LoginInput,
  MutationSignUpArgs,
} from '../../../../graphql-codegen-types';
import { Auth } from '../../providers';
import { AppError } from '../../../../utils';
import { AuthenticatedUser } from '../../auth.module';

export async function login(
  obj: any,
  { input }: MutationSignUpArgs,
  { injector, response }: any
) {
  try {
    // const head = await injector.get(AuthenticatedUser);
    // if (!head.gg) return new AuthenticationError('Eroor');
    // console.log(args);
    // const data = await injector.get(AuthenticatedUser);
    // console.log(data);
    return await injector.get(Auth).login(input, response);
  } catch (error) {
    throw new AppError(error.message, error.code);
  }
}
export const query = { login };
