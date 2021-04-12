import {
  loadSchemaSync,
  GraphQLFileLoader,
  addResolversToSchema,
  loadSchema,
} from 'graphql-tools';

import AuhtDirective from './schema/credential/directives';

const schema = await loadSchema('./**/*.graphql', {
  // load from multiple files using glob
  loaders: [new GraphQLFileLoader()],
});
import { DateTimeResolver, EmailAddressResolver } from 'graphql-scalars';
// Write some resolvers
const resolvers = {
  Date: DateTimeResolver,
  Email: EmailAddressResolver,
};

// Add resolvers to the schema
const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});
const schemaDirectives = {
  auth: AuhtDirective,
};

export { schemaWithResolvers, schemaDirectives };
