import { AuthenticatedUser } from '../../auth/auth.module';
import { Users } from '../providers/users';

export default {
  Query: {
    users: (_root: any, _args: {}, { injector }: GraphQLModules.Context) => {
      const user = injector.get(AuthenticatedUser);
      console.log(user);
      return injector.get(Users).allUsers();
    },
    user: (_root: any, { id }: any, { injector }: GraphQLModules.Context) =>
      injector.get(Users).getUser(id),
  },
};
