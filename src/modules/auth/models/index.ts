import { model, Schema, Document, SchemaTypes } from 'mongoose';
import validator from 'validator';
import bycript from 'bcrypt';

export interface IAuthProvider extends Document {
  userName: string;
  email: string;
  password: string;
  provider: string;
  verifiedCode: Number;
  verified: Boolean;
  userId: string;
  role: string;
  passwordChangedAt: number;
  passwordResetExpires: number;
  correctPassword: Function;
}

const authSchema = new Schema(
  {
    userName: {
      type: SchemaTypes.String,
      required: [true, 'Please provide your user name'],
      unique: true,
    },
    email: {
      type: SchemaTypes.String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: SchemaTypes.String,
      minlength: 8,
      select: false,
    },
    provider: {
      type: SchemaTypes.String,
      enum: ['Email', 'Gmail'],
      default: 'Email',
    },
    verifiedCode: SchemaTypes.Number,
    verified: {
      type: SchemaTypes.Boolean,
      default: false,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
    },
    role: [
      {
        type: SchemaTypes.String,
        enum: ['User', 'Moderator', 'Admin'],
        default: ['User'],
      },
    ],
    passwordChangedAt: SchemaTypes.Date,
    passwordResetExpires: SchemaTypes.Date,
  },
  { timestamps: true }
);

authSchema.pre<IAuthProvider>(/^find/, function (next) {
  this.populate('userId');
  //   .populate({
  //   path: 'user',
  //   select: 'name',
  // });
  next();
});

authSchema.pre<IAuthProvider>('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

authSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bycript.compare(candidatePassword, userPassword);
};

authSchema.pre<IAuthProvider>('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // hass the password with cost of 12
  this.password = await bycript.hash(this.password, 12);
  this.verifiedCode = ~~(Math.random() * (99999 - 10000) + 10000);

  next();
});

authSchema.method('toClient', function () {
  const obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});
const AuthProvider = model<IAuthProvider>('AuthProvider', authSchema);

export default AuthProvider;
