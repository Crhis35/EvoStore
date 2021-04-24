import { Injectable } from 'graphql-modules';
import { MutationCreateUserArgs } from '../../../graphql-codegen-types';
import User from '../models';

@Injectable()
export class Users {
  constructor() {}
  async createUser(input: MutationCreateUserArgs) {
    return await User.create(input);
  }
}
