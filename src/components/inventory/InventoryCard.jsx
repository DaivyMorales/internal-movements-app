import { productContext } from "@/context/ContextProducts";
import { useContext, useEffect, useState } from "react";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { contextInventory } from "@/context/ContextInventory";

export default function InventoryCard({ inventory }) {
  const router = useRouter();

  // const fechaISO8601 = inventory.createdAt;
  // const fecha = new Date(fechaISO8601);
  // const fechaFormateada = format(fecha, "dd/MM/yyyy");
  // console.log(fechaFormateada);

  const { getProduct } = useContext(productContext);
  const { deleteInventory } = useContext(contextInventory);

  const [product, setProduct] = useState([]);
  // console.log("product", product);
  console.log("product", product);

  const [productStatusRequest, setProductStatusRequest] = useState();

  const loadProduct = async (code) => {
    const response = await getProduct(code);
    setProduct(response);
  };
  useEffect(() => {
    if (inventory.product !== null) {
      loadProduct(inventory.product);
    }
  }, []);

  return (
    <tr className="bg-white  border-b w-full h-full">
      {/* <td className="px-4 py-2">{fechaFormateada}</td> */}
      {/* <th
        scope="row"
        className="px-4 py-2 font-semibold text-black  whitespace-nowrap"
      >
        {info.op}
      </th> */}
      <td className="px-4 py-2">
        {!product.code || product === 404 ? "Sin producto" : product.code}
      </td>
      <td className="px-4 py-2">{product.description}</td>
      <td className="px-4 py-2">{product.presentation}</td>
      <td className="px-4 py-2">{inventory.sap_lot}</td>
      <td className="px-4 py-2">{inventory.bulk_quantity}</td>
      <td className="px-4 py-2">{inventory.balance_quantity}</td>
      <td className="px-4 py-2 font-semibold text-black  whitespace-nowrap">
        {inventory.bulk_quantity * product.presentation +
          inventory.balance_quantity}
      </td>
      <td className="px-4 py-2">
        {/* <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a> */}

        <button
          className="p-1 "
          onClick={() => {
            deleteInventory(inventory._id);
          }}
        >
          <HiTrash color="black" />
        </button>

        <button
          className="p-1 "
          onClick={() => {
            router.push(`/information/${info._id}/edit`);
          }}
        >
          <HiPencilAlt color="black" />
        </button>
      </td>
    </tr>
  );
}
