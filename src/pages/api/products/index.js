import { dbConnect } from "../../../utils/db";
import Product from "../../../models/product.model";

dbConnect();

export default function handler(req, res) {
  res.status(200).json({ name: "Products" });
}
