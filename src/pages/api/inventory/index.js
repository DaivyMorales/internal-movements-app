import { dbConnect } from "../../../utils/db";
import Inventory from "../../../models/inventory.model";
import Product from "../../../models/product.model";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const inventory = await Inventory.find();
        return res.status(200).json(inventory);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    case "POST":
      try {
        const { product, sap_lot, bulk_quantity, balance_quantity } = body;

        const newInventory = new Inventory({
          product,
          sap_lot,
          bulk_quantity,
          balance_quantity,
        });
        const inventorySaved = await newInventory.save();

        return res.status(200).json(inventorySaved);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "That method isn't supported!" });
  }
}
