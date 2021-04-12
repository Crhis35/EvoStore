import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ModuleContext } from '@graphql-modules/core';
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
  password?: Maybe<Scalars['String']>;
  provider: Provider;
  verifiedCode?: Maybe<Scalars['Int']>;
  verified: Scalars['Boolean'];
  userId?: Maybe<User>;
  role: Role;
  createdAt?: Maybe<Scalars['Date']>;
  updateAt?: Maybe<Scalars['Date']>;
};

export type AuthProviderInput = {
  email: Scalars['Email'];
  password?: Maybe<Scalars['String']>;
  provider: Provider;
};



export const enum Provider {
  Email = 'Email',
  Gmail = 'Gmail'
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  login?: Maybe<AuthAndToken>;
  signUp?: Maybe<AuthAndToken>;
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QuerySignUpArgs = {
  input: AuthProviderInput;
};

export const enum Role {
  Admin = 'ADMIN',
  Owner = 'OWNER',
  User = 'USER'
};

export type User = {
  __typename?: 'User';
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
  Provider: Provider;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  User: ResolverTypeWrapper<User>;
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
  Query: {};
  User: User;
  loginInput: LoginInput;
}>;

export type AuthDirectiveArgs = {   requires: Role; };

export type AuthDirectiveResolver<Result, Parent, ContextType = ModuleContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthAndTokenResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['AuthAndToken'] = ResolversParentTypes['AuthAndToken']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  auth?: Resolver<ResolversTypes['AuthProvider'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthProviderResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['AuthProvider'] = ResolversParentTypes['AuthProvider']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['Email'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  provider?: Resolver<ResolversTypes['Provider'], ParentType, ContextType>;
  verifiedCode?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
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

export type QueryResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  login?: Resolver<Maybe<ResolversTypes['AuthAndToken']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'input'>>;
  signUp?: Resolver<Maybe<ResolversTypes['AuthAndToken']>, ParentType, ContextType, RequireFields<QuerySignUpArgs, 'input'>>;
}>;

export type UserResolvers<ContextType = ModuleContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pictureUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ModuleContext> = ResolversObject<{
  AuthAndToken?: AuthAndTokenResolvers<ContextType>;
  AuthProvider?: AuthProviderResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Email?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ModuleContext> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = ModuleContext> = ResolversObject<{
  auth?: AuthDirectiveResolver<any, any, ContextType>;
}>;


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = ModuleContext> = DirectiveResolvers<ContextType>;