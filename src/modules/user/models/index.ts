import { model, Schema, Document, SchemaTypes } from 'mongoose';

export interface IUser extends Document {
  name: string;
  lastName: string;
  address: string;
}

const userSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: [true, 'Please provide your user name'],
    },
    lastName: {
      type: SchemaTypes.String,
      required: [true, 'Please provide your user lastName'],
    },
    authProvider: {
      type: SchemaTypes.ObjectId,
      ref: 'AuthProvider',
      require: [true, 'Please provide your credentials'],
    },
    pictureUrl: SchemaTypes.String,
  },
  { timestamps: true }
);
userSchema.method('toClient', function () {
  const obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});
const User = model<IUser>('User', userSchema);

export default User;
