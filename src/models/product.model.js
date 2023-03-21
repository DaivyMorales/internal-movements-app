import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    code: {
      type: String,
      require: [true, "The code is required"],
      unique: true,
      trim: true,
      maxlength: [20, "The max length is 20 character"],
    },
    description: {
      type: String,
      require: [true, "The description is required"],
      trim: true,
      maxlength: [80, "The max length is 80 character for description"],
    },
    presentation: {
      type: Number,
      require: [true, "The presentation is required"],
      maxlength: [4, "The max length is 4 character for presentation"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Product || model("Product", productSchema);
