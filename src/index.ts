import 'reflect-metadata';
import { environment } from './environment';
import { graphqlUploadExpress } from 'graphql-upload';
import mongoose from 'mongoose';
import express from 'express';
import * as http from 'http';
import { ApolloServer, PubSub } from 'apollo-server-express';
import Consola from 'consola';
import { join } from 'path';
import { application } from './application';

export const pubsub = new PubSub();

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));
app.use(express.static(join(__dirname, './images')));
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

const schema = application.createSchemaForApollo();
const HEADER_NAME = 'authorization';

const server = new ApolloServer({
  schema,
  uploads: false,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  subscriptions: {
    path: '/subscriptions',
  },
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    console.log(req.headers);
    try {
      authToken = req.headers[HEADER_NAME];

      if (authToken) {
        // currentUser = await tradeTokenForUser(authToken);
        currentUser = true;
      }
    } catch (e) {
      console.warn(`Unable to authenticate using auth token: ${authToken}`);
    }

    return {
      authToken,
      currentUser,
    };
  },
});

const startApp = async () => {
  try {
    await mongoose.connect(environment.database, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    Consola.success({
      badge: true,
      message: `Successfully connected with the database`,
    });
    // Apply Apollo-Expr,cors: trueess-Server Middlware to express application
    server.applyMiddleware({ app, cors: true });

    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);
    httpServer.listen(environment.port, () =>
      Consola.success({
        badge: true,
        message: `🚀 Server ready at http://localhost:${environment.port}${server.graphqlPath}`,
      })
    );
  } catch (error) {
    Consola.error({
      badge: true,
      message: error.message,
    });
  }
};

startApp();
