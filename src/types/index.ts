import { SortBy } from '../graphql-codegen-types';

export interface ApiArgs {
  search?: String;
  page?: number;
  limit?: number;
  sort?: SortBy;
  filter?: String;
}
