import mongoose, { Schema, model, models } from "mongoose";
import Product from "./product.model";

const inventorySchema = new Schema(
  {
    product: {
      type: String,
      ref: "Product",
      validate: {
        validator: function (code) {
          if (code === undefined || code === null) {
            // El campo es opcional y no se debe validar
            return true;
          } else {
            // El campo es obligatorio y se debe validar
            return Product.findOne({ code })
              .then((product) => !!product)
              .catch(() => false);
          }
        },
        message: "El producto no existe",
      },
    },
    sap_lot: {
      type: String,
      trim: true,
    },
    bulk_quantity: {
      type: Number,
      trim: true,
    },
    balance_quantity: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Inventory || model("Inventory", inventorySchema);
