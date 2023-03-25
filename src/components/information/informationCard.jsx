import { contextInformation } from "@/context/ContextInformation";
import { productContext } from "@/context/ContextProducts";
import { useContext, useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";

export default function InformationCard({ info }) {
  const { getProduct } = useContext(productContext);
  const { deleteInformation } = useContext(contextInformation);

  const [product, setProduct] = useState([]);

  const loadProduct = async (id) => {
    const response = await getProduct(id);
    setProduct(response);
    // console.log(product)
  };

  useEffect(() => {
    loadProduct(info.product._id || info.product);
  }, []);

  return (
    <tr className="bg-white  border-b w-full h-full">
      <th
        scope="row"
        className="px-4 py-2 font-semibold text-black  whitespace-nowrap"
      >
        {info.op}
      </th>
      <td className="px-4 py-2">{product.code || info.product.code}</td>
      <td className="px-4 py-2">
        {product.description || info.product.description}
      </td>
      <td className="px-4 py-2">{info.sap_lot}</td>
      <td className="px-4 py-2">{info.provider_lot}</td>
      <td className="px-4 py-2">{info.packages_delivered}</td>
      <td className="px-4 py-2">{info.balances}</td>
      <td className="px-4 py-2">
        {/* <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a> */}

        <button
          className="p-1 hover:bg-red-600 rounded-full "
          onClick={() => {
            deleteInformation(info._id);
          }}
        >
          <HiTrash color="white" />
        </button>
      </td>
    </tr>
  );
}