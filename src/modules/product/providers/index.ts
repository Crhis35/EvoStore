import { Injectable } from 'graphql-modules';

import {
  MutationCreateProductArgs,
  MutationUpdateProductArgs,
  QueryGetProductArgs,
  QueryListProductsArgs,
} from '../../../graphql-codegen-types';
import { ApiArgs } from '../../../types';
import { APIPagination, AppError } from '../../../utils';
import Product from '../models';

@Injectable()
export class ProductProvider {
  constructor() {}

  async createProduct({ input }: MutationCreateProductArgs) {
    return await Product.create(input);
  }
  async updateProduct(args: MutationUpdateProductArgs) {
    return await Product.findByIdAndUpdate(args.id, args.input as any);
  }
  async getProduct(args: QueryGetProductArgs) {
    return await Product.findById(args);
  }
  async listProducts(args: QueryListProductsArgs) {
    return APIPagination(Product, args as ApiArgs);
  }
}
