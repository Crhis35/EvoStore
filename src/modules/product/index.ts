import { createModule } from 'graphql-modules';
import { ProductProvider } from './providers';
import { resolvers } from './resolvers';
import typeDefs from './type-defs/schema.graphql';

export const ProductModule = createModule({
  id: 'product',
  dirname: __dirname,
  typeDefs,
  resolvers,
  providers: [ProductProvider],
});
