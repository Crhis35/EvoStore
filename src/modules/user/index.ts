import { createModule } from 'graphql-modules';
import { Users } from './providers/users';
import { resolvers } from './resolvers';
import typeDefs from './type-defs/schema.graphql';

export const UserModule = createModule({
  id: 'user',
  dirname: __dirname,
  providers: [Users],
  resolvers,
  typeDefs,
});
