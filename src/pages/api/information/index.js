import { dbConnect } from "../../../utils/db";
import Information from "../../../models/information.model";
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
        const information = await Information.find();
        return res.status(200).json(information);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    case "POST":
      try {
        const { op, sap_lot, provider_lot, packages_delivered, balances } =
          body;

        const product = await Product.findOne({
          code: body.product,
        }); /*.populate("Products");*/

        const newInformation = new Information({
          op,
          product,
          sap_lot,
          provider_lot,
          packages_delivered,
          balances,
        });
        const informationSaved = await newInformation.save();

        // Obtener el objeto plano de JavaScript con la función `lean()`
        // const populatedInformation = await Information.findById(
        //   informationSaved._id
        // )
        //   .populate({
        //     path: "product",
        //     select: "code description presentation -_id",
        //   })
        //   .lean()
        //   .exec();

        // // Renombrar la propiedad `product._id` a `product`
        // populatedInformation.product = {
        //   code: populatedInformation.product.code,
        //   description: populatedInformation.product.description,
        //   presentation: populatedInformation.product.presentation,
        // };
        // delete populatedInformation.product._id;

        return res.status(200).json(informationSaved);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "That method isn't supported!" });
  }
}
