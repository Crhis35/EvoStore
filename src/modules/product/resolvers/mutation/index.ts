import {
  MutationCreateProductArgs,
  MutationUpdateProductArgs,
} from '../../../../graphql-codegen-types';
import { AppError } from '../../../../utils';
import { ProductProvider } from '../../providers';

export async function updateProduct(
  obj: any,
  args: MutationUpdateProductArgs,
  { injector }: GraphQLModules.Context
) {
  try {
    return await injector.get(ProductProvider).updateProduct(args);
  } catch (error) {
    throw new AppError(error.message, error.code);
  }
}
export async function createProduct(
  obj: any,
  args: MutationCreateProductArgs,
  { injector }: GraphQLModules.Context
) {
  return await injector.get(ProductProvider).createProduct(args);
}
export const mutation = { updateProduct, createProduct };
