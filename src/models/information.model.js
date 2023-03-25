import mongoose, { Schema, model, models } from "mongoose";
import Product from "./product.model";

const informationSchema = new Schema(
  {
    op: {
      type: String,
    },
    product: {
      type: String,
      ref: "Product",
      required: [true, "The code is required!"],
      validate: {
        validator: function (code) {
          return Product.findOne({ code })
            .then((product) => !!product)
            .catch(() => false);
        },
        message: "The product does not exist",
      },
    },
    sap_lot: {
      type: String,
      trim: true,
    },
    provider_lot: {
      type: String,
      trim: true,
    },
    packages_delivered: {
      type: Number,
      trim: true,
    },
    balances: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Information || model("Information", informationSchema);
