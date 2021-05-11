import { createApplication } from 'graphql-modules';
import { PubSub } from 'graphql-subscriptions';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common';
import { ProductModule } from './modules/product';
import { ReviewModule } from './modules/review';
import { UserModule } from './modules/user/index';

export const application = createApplication({
  modules: [CommonModule, AuthModule, UserModule, ProductModule, ReviewModule],
  providers: [
    {
      provide: PubSub,
      useValue: new PubSub(),
    },
  ],
});
