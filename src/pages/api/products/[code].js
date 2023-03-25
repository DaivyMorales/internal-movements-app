import { dbConnect } from "../../../utils/db";
import Product from "../../../models/product.model";

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { code },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const product = await Product.findOne({ code: code });

        if (!product) return res.status(404).json({ msg: "Product not found" });

        res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    case "PUT":
      try {
        const product = await Product.findOneAndUpdate({ code }, body, {
          new: true,
        });

        if (!product) return res.status(404).json({ msg: "Product not found" });

        return res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    case "DELETE":
      try {
        const deletedProduct = await Product.findOneAndRemove({ code });

        if (!deletedProduct)
          return res.status(404).json({ msg: "Product not found" });

        return res.status(204).json({ msg: "The product has been removed" });
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    default:
      return res.status(400).json({ msg: "That method isn't supported!" });
  }
}
