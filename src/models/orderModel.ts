import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  email: string;
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  totalPrice: number;
}

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: function (email: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Invalid email format",
      },
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
