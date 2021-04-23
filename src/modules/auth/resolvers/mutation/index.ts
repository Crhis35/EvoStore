import { MutationSignUpArgs } from '../../../../graphql-codegen-types';
import jwt from 'jsonwebtoken';
import { AuthenticatedUser } from '../../auth.module';
import { ApolloError, AuthenticationError } from 'apollo-server-express';
import AuthProvider, { IAuthProvider } from '../../models';
import { environment } from '../../../../environment';
import Email from '../../../../service/email';

const signToken = (id: string) => {
  return jwt.sign({ id: id }, environment.jwtSecret, {
    expiresIn: environment.jwtExpires,
  });
};

const createSendToken = (auth: IAuthProvider, res: any) => {
  const token = signToken(auth.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + environment.jwtCookieExpires * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
  };
  if (environment.env === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  return {
    token,
    auth,
  };
};

export async function signUp(
  obj: any,
  { input }: MutationSignUpArgs,
  { injector, request, response }: any
) {
  try {
    // const head = await injector.get(AuthenticatedUser);
    // if (!head.gg) return new AuthenticationError('Eroor');
    // console.log(args);
    const auth = await AuthProvider.create(input);

    const url = `${request.protocol}://${request.get('host')}`;

    await new Email(auth, url).sendWelcome(auth.verifiedCode);
    return createSendToken(auth, response);
  } catch (error) {
    throw new ApolloError(error);
  }
}

export const mutation = { signUp };
