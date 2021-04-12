import { createApplication } from 'graphql-modules';
import { PubSub } from 'graphql-subscriptions';
import { UserModule } from './modules/user/index';

export const application = createApplication({
  modules: [UserModule],
  providers: [
    {
      provide: PubSub,
      useValue: new PubSub(),
    },
  ],
});
