import { dbConnect } from "../../../utils/db";
import Product from "../../../models/product.model";

dbConnect();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const products = await Product.find();
        return res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    case "POST":
      try {
        const { code, description, presentation } = body;

        const newProduct = new Product({ code, description, presentation });
        const productSaved = await newProduct.save();

        return res.status(200).json(productSaved);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "That method isn't supported!" });
  }
}
