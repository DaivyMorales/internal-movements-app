import { dbConnect } from "../../../utils/db";
import Information from "../../../models/information.model";

dbConnect();

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
        const information = await Information.findById(id);

        if (!information)
          return res.status(404).json({ msg: "Information not found" });

        res.status(200).json(information);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    case "PUT":
      try {
        const information = await Information.findByIdAndUpdate(id, body, {
          new: true,
        });

        if (!information)
          return res.status(404).json({ msg: "Information not found" });

        return res.status(200).json(information);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    case "DELETE":
      try {
        const deletedInformation = await Information.findByIdAndRemove(id);

        if (!deletedInformation)
          return res.status(404).json({ msg: "Information not found" });

        return res
          .status(204)
          .json({ msg: "The information has been removed" });
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    default:
      return res.status(400).json({ msg: "That method isn't supported!" });
  }
};
