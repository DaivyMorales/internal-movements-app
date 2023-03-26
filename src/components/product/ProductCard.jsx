import { HiTrash, HiPencilAlt } from "react-icons/hi";
import { useRouter } from "next/router";
import { useContext } from "react";
import { productContext } from "@/context/ContextProducts";

export default function ProductCard({ product }) {
  const { deleteProduct } = useContext(productContext);

  const router = useRouter();
  return (
    <tr className="bg-white  border-b w-full h-full z-50">
      <th
        scope="row"
        className="px-4 py-2 font-semibold text-black  whitespace-nowrap"
      >
        {product.code}
      </th>
      <td className="px-4 py-2">{product.description}</td>
      <td className="px-4 py-2">{product.presentation}</td>
      <td className="px-4 py-2">
        <button
          className="p-1 "
          onClick={() => {
            router.push(`/products/${product.code}/edit`);
          }}
        >
          <HiPencilAlt color="black" size={17} />
        </button>
        <button
          className="p-1 "
          onClick={() => {
            deleteProduct(product.code);
          }}
        >
          <HiTrash color="black" size={17} />
        </button>
      </td>
    </tr>
  );
}
