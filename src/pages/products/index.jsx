import { productContext } from "@/context/ContextProducts";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "@/components/product/ProductCard";
import { HiOutlineDocumentAdd, HiOutlinePlus } from "react-icons/hi";
import ProductForm from "./productForm";

export default function Home({ data }) {
  const { products, setProducts, deleteProduct } = useContext(productContext);

  const [showForm, setShowForm] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setProducts(data);
  }, [data]);

  return (
    <div className="w-screen mt-20 flex flex-col justify-center items-center px-4 gap-y-5 mb-20 lg:h-screen lg:mt-0 lg:mb-0">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {!showForm ? (
          <div className="px-24 border-2 border-dashed border-slate-200 py-6 rounded-xl flex flex-col gap-y-1 justify-center items-center text-center">
            <div className="p-2 bg-slate-200 rounded-full">
              <HiOutlineDocumentAdd color="black" />
            </div>
            <h3 className="text-xs font-normal ">
              Ingresa a un <span className="font-bold">Formulario</span>{" "}
              <br></br> para crear un nuevo producto
            </h3>
            <div
              className="flex justify-center items-center gap-x-2 border-2 text-white bg-black px-4 cursor-pointer text-xs font-semibold py-2 rounded-xl hover:bg-white hover:text-black hover: border-black"
              onClick={() => {
                // router.push("/products/productForm");
                setShowForm(!showForm);
              }}
            >
              <HiOutlinePlus size={14} />
              Añadir Producto
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-200 rounded-xl flex justify-center items-start">
            <ProductForm showForm={showForm} setShowForm={setShowForm} />
          </div>
        )}

        <div className=" bg-slate-100 flex pt-2 flex-col justify-start items-center  overflow-x-auto  rounded-lg  ">
          <div className="w-full grid grid-cols-2 ">
            <div className="px-3 flex">
              <h2 className="font-bold text-2xl text-black">Productos</h2>
              <p className="text-green-500 text-xs font-black">
                {products.length}
              </p>
            </div>
            <div className="flex justify-end items-center px-3"></div>
          </div>
          <table className="text-sm text-left w-full text-gray-500  ">
            <thead className="text-xs text-black ">
              <tr className="">
                <th scope="col" className="px-3 py-2">
                  Código
                </th>
                <th scope="col" className="px-3 py-2">
                  Descripción
                </th>
                <th scope="col" className="px-3 py-2">
                  Presentación
                </th>
                <th scope="col" className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {products.map((product) => (
                <ProductCard product={product} key={product.code} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    "https://darling-cassata-6b0d17.netlify.app/api/products"
  );
  const data = await res.json();

  return {
    props: { data },
  };
}
