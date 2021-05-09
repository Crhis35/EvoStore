import {
  LoginInput,
  MutationCreateUserArgs,
  MutationSignUpArgs,
} from '../../../../graphql-codegen-types';
import { AppError } from '../../../../utils';
import { AuthenticatedUser } from '../../../auth/auth.module';
import { IAuthProvider } from '../../../auth/models';
import { Auth } from '../../../auth/providers';
import { Users } from '../../providers/users';

export async function createUser(
  obj: any,
  { input }: MutationCreateUserArgs,
  { injector, request, response }: any
) {
  try {
    const head: IAuthProvider = await injector.get(AuthenticatedUser);
    // if (!head.gg) return new AuthenticationError('Eroor');
    // console.log(args);

    if (!head || !head.verified)
      throw new AppError('Please get verifed', '404');
    if (head.userId) throw new AppError('You currently have a user', '404');

    const user = await injector.get(Users).createUser(input);

    await injector.get(Auth).update(head.id, { userId: user.id });

    return user;
  } catch (error) {
    throw new AppError(error.message, error.code);
  }
}
export const mutation = { createUser };
