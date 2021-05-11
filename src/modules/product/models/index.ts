import { model, Schema, Document, SchemaTypes } from 'mongoose';
import { Price, Review } from '../../../graphql-codegen-types';

export interface IProduct extends Document {
  name: string;
  description: string;
  listPrice: [Price];
  defaultPrice: number;
  price: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  images: [string];
  quantity: number;
  stock: Boolean;
  brand: String;
  Reviews: [Review];
}

const productSchema = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: [true, 'Please provide product name'],
    },
    description: {
      type: SchemaTypes.String,
      required: [true, 'Please provide product'],
    },
    listPrice: [
      {
        name: {
          type: SchemaTypes.String,
          required: [true, 'Please provide list name '],
        },
        price: {
          type: SchemaTypes.Number,
          required: [true, 'Please provide list price'],
        },
      },
    ],
    defaultPrice: {
      type: SchemaTypes.Number,
      required: [true, 'Please provide product defaultPrice'],
    },
    price: {
      type: SchemaTypes.String,
      required: [true, 'Please provide product price'],
    },
    images: [
      {
        type: SchemaTypes.String,
      },
    ],
    ratingsAverage: {
      type: SchemaTypes.Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val: number) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: SchemaTypes.Number,
      default: 0,
    },
    quantity: {
      type: SchemaTypes.Number,
      required: [true, 'Please provide product quantity'],
    },
    stock: {
      type: SchemaTypes.Boolean,
      default: true,
    },
    brand: {
      type: SchemaTypes.String,
    },
    Reviews: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Review',
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
// 1 min asscendin order and -1 descending
productSchema.index({ price: 1, ratingsAverage: -1 });

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

productSchema.method('toClient', function () {
  const obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  delete obj._id;

  return obj;
});

const Product = model<IProduct>('Product', productSchema);

export default Product;
