import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Email: any;
  Upload: any;
};



export type AuthAndToken = {
  __typename?: 'AuthAndToken';
  token: Scalars['String'];
  auth: AuthProvider;
};

export type AuthProvider = {
  __typename?: 'AuthProvider';
  id: Scalars['ID'];
  email: Scalars['Email'];
  userName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  provider: Provider;
  verifiedCode?: Maybe<Scalars['Int']>;
  verified: Scalars['Boolean'];
  userId?: Maybe<User>;
  role: Array<Maybe<Role>>;
  passwordChangedAt?: Maybe<Scalars['Date']>;
  passwordResetExpires?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  updateAt?: Maybe<Scalars['Date']>;
};

export type AuthProviderInput = {
  userName: Scalars['String'];
  email: Scalars['Email'];
  password?: Maybe<Scalars['String']>;
  provider: Provider;
  role?: Maybe<Array<Maybe<Role>>>;
};



export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['String']>;
  createProduct?: Maybe<Product>;
  createReview?: Maybe<Review>;
  createUser?: Maybe<User>;
  deleteReview?: Maybe<Review>;
  imageUploader: Scalars['String'];
  signUp?: Maybe<AuthAndToken>;
  updateItem?: Maybe<Product>;
  updateReview?: Maybe<Review>;
  verified?: Maybe<AuthProvider>;
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};


export type MutationCreateReviewArgs = {
  input: ReviewInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationDeleteReviewArgs = {
  id: Scalars['ID'];
};


export type MutationImageUploaderArgs = {
  file: Scalars['Upload'];
};


export type MutationSignUpArgs = {
  input: AuthProviderInput;
};


export type MutationUpdateItemArgs = {
  id: Scalars['ID'];
  input: ProductInput;
};


export type MutationUpdateReviewArgs = {
  id: Scalars['ID'];
  input: ReviewInput;
};


export type MutationVerifiedArgs = {
  code: Scalars['Int'];
};

export const enum Order {
  Asc = 'ASC',
  Desc = 'DESC'
};

export type Price = {
  __typename?: 'Price';
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  listPrice: Array<Price>;
  defaultPrice: Scalars['Int'];
  price: Scalars['Float'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  quantity: Scalars['Int'];
  stock: Scalars['Boolean'];
  brand?: Maybe<Scalars['String']>;
  Reviews?: Maybe<Array<Maybe<Review>>>;
  createdAt?: Maybe<Scalars['Date']>;
  updateAt?: Maybe<Scalars['Date']>;
};

export type ProductInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  listPrice: Array<Maybe<Price>>;
  price: Scalars['Float'];
  defaultPrice: Scalars['Int'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  quantity: Scalars['Int'];
  stock?: Maybe<Scalars['Boolean']>;
  brand?: Maybe<Scalars['String']>;
};

export type ProductPaginator = {
  __typename?: 'ProductPaginator';
  items: Array<Maybe<Product>>;
  currentPage: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export const enum Provider {
  Email = 'Email',
  Gmail = 'Gmail'
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['String']>;
  currentUser?: Maybe<User>;
  getProduct?: Maybe<Product>;
  listProduct?: Maybe<ProductPaginator>;
  listReviwsProduct?: Maybe<ReviewPaginator>;
  login?: Maybe<AuthAndToken>;
  me?: Maybe<AuthProvider>;
};


export type QueryGetProductArgs = {
  id: Scalars['ID'];
};


export type QueryListProductArgs = {
  search?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortBy>;
  filter?: Maybe<Scalars['String']>;
};


export type QueryListReviwsProductArgs = {
  id: Scalars['ID'];
  page?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortBy>;
};


export type QueryLoginArgs = {
  input: LoginInput;
};

export type Review = {
  __typename?: 'Review';
  review: Scalars['String'];
  rating: Scalars['Float'];
  product: Product;
  user: User;
  createdAt?: Maybe<Scalars['Date']>;
  updateAt?: Maybe<Scalars['Date']>;
};

export type ReviewInput = {
  review: Scalars['String'];
  rating: Scalars['Float'];
  product: Product;
};

export type ReviewPaginator = {
  __typename?: 'ReviewPaginator';
  items: Array<Maybe<Review>>;
  currentPage: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export const enum Role {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
  Owner = 'Owner'
};

export type SortBy = {
  field: Scalars['String'];
  order: Order;
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['String']>;
};


export type User = {
  __typename?: 'User';
  name: Scalars['String'];
  lastName: Scalars['String'];
  pictureUrl?: Maybe<Scalars['String']>;
};

export type UserInput = {
  name: Scalars['String'];
  lastName: Scalars['String'];
  pictureUrl?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  email: Scalars['Email'];
  password: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthAndToken: ResolverTypeWrapper<AuthAndToken>;
  String: ResolverTypeWrapper<Scalars['String']>;
  AuthProvider: ResolverTypeWrapper<AuthProvider>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  AuthProviderInput: AuthProviderInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Email: ResolverTypeWrapper<Scalars['Email']>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: Order;
  Price: ResolverTypeWrapper<Price>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Product: ResolverTypeWrapper<Product>;
  ProductInput: ProductInput;
  ProductPaginator: ResolverTypeWrapper<ProductPaginator>;
  Provider: Provider;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  ReviewInput: ReviewInput;
  ReviewPaginator: ResolverTypeWrapper<ReviewPaginator>;
  Role: Role;
  SortBy: SortBy;
  Subscription: ResolverTypeWrapper<{}>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  loginInput: LoginInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthAndToken: AuthAndToken;
  String: Scalars['String'];
  AuthProvider: AuthProvider;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Boolean: Scalars['Boolean'];
  AuthProviderInput: AuthProviderInput;
  Date: Scalars['Date'];
  Email: Scalars['Email'];
  Mutation: {};
  Price: Price;
  Float: Scalars['Float'];
  Product: Product;
  ProductInput: ProductInput;
  ProductPaginator: ProductPaginator;
  Query: {};
  Review: Review;
  ReviewInput: ReviewInput;
  ReviewPaginator: ReviewPaginator;
  SortBy: SortBy;
  Subscription: {};
  Upload: Scalars['Upload'];
  User: User;
  UserInput: UserInput;
  loginInput: LoginInput;
}>;

export type AuthDirectiveArgs = {  };

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type HasRoleDirectiveArgs = {   roles?: Maybe<Array<Role>>; };

export type HasRoleDirectiveResolver<Result, Parent, ContextType = any, Args = HasRoleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthAndTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthAndToken'] = ResolversParentTypes['AuthAndToken']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  auth?: Resolver<ResolversTypes['AuthProvider'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthProviderResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthProvider'] = ResolversParentTypes['AuthProvider']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['Email'], ParentType, ContextType>;
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provider?: Resolver<ResolversTypes['Provider'], ParentType, ContextType>;
  verifiedCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  role?: Resolver<Array<Maybe<ResolversTypes['Role']>>, ParentType, ContextType>;
  passwordChangedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  passwordResetExpires?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updateAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface EmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Email'], any> {
  name: 'Email';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'input'>>;
  createReview?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<MutationCreateReviewArgs, 'input'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteReview?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<MutationDeleteReviewArgs, 'id'>>;
  imageUploader?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationImageUploaderArgs, 'file'>>;
  signUp?: Resolver<Maybe<ResolversTypes['AuthAndToken']>, ParentType, ContextType, RequireFields<MutationSignUpArgs, 'input'>>;
  updateItem?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationUpdateItemArgs, 'id' | 'input'>>;
  updateReview?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<MutationUpdateReviewArgs, 'id' | 'input'>>;
  verified?: Resolver<Maybe<ResolversTypes['AuthProvider']>, ParentType, ContextType, RequireFields<MutationVerifiedArgs, 'code'>>;
}>;

export type PriceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Price'] = ResolversParentTypes['Price']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  listPrice?: Resolver<Array<ResolversTypes['Price']>, ParentType, ContextType>;
  defaultPrice?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stock?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  brand?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  Reviews?: Resolver<Maybe<Array<Maybe<ResolversTypes['Review']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updateAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProductPaginatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductPaginator'] = ResolversParentTypes['ProductPaginator']> = ResolversObject<{
  items?: Resolver<Array<Maybe<ResolversTypes['Product']>>, ParentType, ContextType>;
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  getProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryGetProductArgs, 'id'>>;
  listProduct?: Resolver<Maybe<ResolversTypes['ProductPaginator']>, ParentType, ContextType, RequireFields<QueryListProductArgs, never>>;
  listReviwsProduct?: Resolver<Maybe<ResolversTypes['ReviewPaginator']>, ParentType, ContextType, RequireFields<QueryListReviwsProductArgs, 'id'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthAndToken']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'input'>>;
  me?: Resolver<Maybe<ResolversTypes['AuthProvider']>, ParentType, ContextType>;
}>;

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = ResolversObject<{
  review?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  updateAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReviewPaginatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReviewPaginator'] = ResolversParentTypes['ReviewPaginator']> = ResolversObject<{
  items?: Resolver<Array<Maybe<ResolversTypes['Review']>>, ParentType, ContextType>;
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  _?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "_", ParentType, ContextType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pictureUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AuthAndToken?: AuthAndTokenResolvers<ContextType>;
  AuthProvider?: AuthProviderResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Email?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Price?: PriceResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductPaginator?: ProductPaginatorResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  ReviewPaginator?: ReviewPaginatorResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  hasRole?: HasRoleDirectiveResolver<any, any, ContextType>;
}>;


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;