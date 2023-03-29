import { dbConnect } from "../../../utils/db";
import Inventory from "../../../models/inventory.model";

dbConnect();

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const inventory = await Inventory.findById(id);

        if (!inventory)
          return res.status(404).json({ msg: "Inventory not found" });

        res.status(200).json(inventory);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    case "PUT":
      try {
        const inventory = await Inventory.findByIdAndUpdate(id, body, {
          new: true,
        });

        if (!inventory)
          return res.status(404).json({ msg: "Inventory not found" });

        return res.status(200).json(inventory);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    case "DELETE":
      try {
        const deletedInventory = await Inventory.findByIdAndRemove(id);

        if (!deletedInventory)
          return res.status(404).json({ msg: "Inventory not found" });

        return res.status(204).json({ msg: "It has been removed" });
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    default:
      return res.status(400).json({ msg: "That method isn't supported!" });
  }
};
