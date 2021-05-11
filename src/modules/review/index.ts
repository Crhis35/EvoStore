import 'graphql-import-node';
import { createModule } from 'graphql-modules';
// import { Users } from './providers/users';
// import { resolvers } from './resolvers';
import typeDefs from './type-defs/schema.graphql';

export const ReviewModule = createModule({
  id: 'review',
  dirname: __dirname,
  typeDefs,
});
