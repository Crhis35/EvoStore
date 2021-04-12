export const authenticated = (next: any) => (
  _root: any,
  args: {},
  context: any,
  info: any
) => {
  if (!context.currentUser) {
    throw new Error(`Unauthenticated!`);
  }

  return next(_root, args, context, info);
};
