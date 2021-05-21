declare global {
  namespace GraphQLModules {
    interface GlobalContext {
      request: any;
      response: any;
      currentUser: IAuthProvider;
    }
  }
}
import 'reflect-metadata';
import { join } from 'path';

import mongoose from 'mongoose';
import express from 'express';
import * as http from 'http';

import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'x-xss-protection';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import {
  ApolloServer,
  PubSub,
  SchemaDirectiveVisitor,
} from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';

import { application } from './application';
import { AuthDirective, HasRoleDirective } from './modules/auth/directives';
import { IAuthProvider } from './modules/auth/models';
import { environment } from './environment';

import Consola from 'consola';

export const pubsub = new PubSub();

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//Set secure http headers
app.use(
  helmet({
    contentSecurityPolicy: environment.env === 'production' ? undefined : false,
  })
);

app.use(cookieParser()); //Limit request from api

// Data sanatization against NoSQL query injection
app.use(mongoSanitize());

// Data sanatization against XSS
app.use(xss());
app.use(compression());
app.use(express.static(join(__dirname, './images')));
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

const schema = application.createSchemaForApollo();

SchemaDirectiveVisitor.visitSchemaDirectives(schema, {
  auth: AuthDirective,
  hasRole: HasRoleDirective,
});

const server = new ApolloServer({
  schema,
  uploads: false,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground,
  subscriptions: {
    path: '/subscriptions',
  },
  context: ({ req, res }) => ({ request: req, response: res }),
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
