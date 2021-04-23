import { createApplication } from 'graphql-modules';
import { PubSub } from 'graphql-subscriptions';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common';
import { UserModule } from './modules/user/index';

export const application = createApplication({
  modules: [CommonModule, AuthModule, UserModule],
  providers: [
    {
      provide: PubSub,
      useValue: new PubSub(),
    },
  ],
});
