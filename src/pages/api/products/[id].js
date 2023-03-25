import { dbConnect } from "../../../utils/db";
import Product from "../../../models/product.model";

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);

        if (!product) return res.status(404).json({ msg: "Product not found" });

        res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    case "PUT":
      try {
        const product = await Product.findByIdAndUpdate(id, body, {
          new: true,
        });

        if (!product) return res.status(404).json({ msg: "Product not found" });

        return res.status(200).json(product);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    case "DELETE":
      try {
        const deletedProduct = await Product.findByIdAndRemove(id);

        if (!deletedProduct)
          return res.status(404).json({ msg: "Product not found" });

        return res.status(204).json({ msg: "The product has been removed" });
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    default:
      return res.status(400).json({ msg: "That method isn't supported!" });
  }
};
