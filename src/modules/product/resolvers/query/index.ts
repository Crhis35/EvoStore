import {
  QueryGetProductArgs,
  QueryListProductsArgs,
} from '../../../../graphql-codegen-types';
import { AppError } from '../../../../utils';
import { ProductProvider } from '../../providers';

export async function getProduct(
  obj: any,
  args: QueryGetProductArgs,
  { injector }: GraphQLModules.Context
) {
  try {
    return await injector.get(ProductProvider).getProduct(args);
  } catch (error) {
    throw new AppError(error.message, error.code);
  }
}
export async function listProducts(
  obj: any,
  args: QueryListProductsArgs,
  { injector }: GraphQLModules.Context
) {
  return await injector.get(ProductProvider).listProducts(args);
}
export const query = { getProduct, listProducts };
