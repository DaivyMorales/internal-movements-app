import mongoose, { Schema, model, models } from "mongoose";
import Product from "./product.model";

const informationSchema = new Schema(
  {
    op: {
      type: Number,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    sap_lot: {
      type: String,
    },
    provider_lot: {
      type: String,
    },
    packages_delivered: {
      type: Number,
    },
    balances: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Information || model("Information", informationSchema);
