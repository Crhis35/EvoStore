import { createModule } from 'graphql-modules';
import { DateTimeResolver, EmailAddressResolver } from 'graphql-scalars';
import { join, parse } from 'path';
import { ensureDirectoryExistence } from '../../utils';
import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import typeDefs from './type.graphql';
import { MutationImageUploaderArgs } from '../../graphql-codegen-types';
import { ApolloError } from 'apollo-server-express';

const storeUpload = async ({ stream, filename }: any) => {
  ensureDirectoryExistence(`${__dirname}/../images`);
  let { ext, name } = parse(filename);

  name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');

  let serverFile = join(__dirname, `/../images/${name}-${Date.now()}${ext}`);

  serverFile = serverFile.replace(' ', '_');
  const fileOutput = `images${serverFile.split('images')[1]}`;
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(serverFile))
      .on('finish', () => resolve(fileOutput))
      .on('error', reject)
  );
};
const processUpload = async (upload: any) => {
  const { createReadStream, filename } = await upload;
  const stream = createReadStream();
  const file = await storeUpload({ stream, filename });
  return file;
};
export const CommonModule = createModule({
  id: 'common',
  dirname: __dirname,
  typeDefs,
  resolvers: {
    Date: DateTimeResolver,
    Email: EmailAddressResolver,
    Upload: GraphQLUpload,
    Mutation: {
      imageUploader: async (_: any, { file }: MutationImageUploaderArgs) => {
        try {
          return await processUpload(file);
        } catch (err) {
          throw new ApolloError(err.message);
        }
      },
    },
  },
});
