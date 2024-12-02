import mongoose, { Document, Schema } from "mongoose";

export enum BicycleType {
  Mountain = "Mountain",
  Road = "Road",
  Hybrid = "Hybrid",
  BMX = "BMX",
  Electric = "Electric",
}

export interface IProduct extends Document {
  name: string;
  brand: string;
  price: number;
  type: BicycleType;
  description: string;
  quantity: number;
  inStock: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: [true, "Name is required"] },
    brand: { type: String, required: [true, "Brand is required"] },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    type: {
      type: String,
      enum: Object.values(BicycleType),
      required: [true, "Type is required"],
    },
    description: { type: String, required: [true, "Description is required"] },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
