import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import InventoryCard from "@/components/inventory/InventoryCard";
import { contextInventory } from "@/context/ContextInventory";

export default function Home({ data }) {
  const { inventories, setInventories } = useContext(contextInventory);

  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  useEffect(() => {
    setInventories(data);
  }, []);

  const handleOp = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className=" flex justify-center items-center flex-col gap-y-2 px-4 ">
      <div className=" bg-white flex pt-2 flex-col justify-start items-center  overflow-x-auto shadow-xs rounded-lg  ">
        <div className="w-full grid grid-cols-2 ">
          <div className="px-3 flex flex-col justify-start items-start gap-y-2">
            <div className="flex">
              <h2 className="font-black text-2xl text-black">
                Inventario
              </h2>
              <p className="text-green-500 text-xs font-black">
                {inventories.length}
              </p>
            </div>
            {/* <div className="flex flex-col gap-y-1">
              <label htmlFor="">Filtrar por Op</label>
              <input
                type="text"
                className="inputForm"
                onChange={handleOp}
                placeholder="Buscar..."
              />
            </div> */}
          </div>
          <div className="flex justify-end items-end px-3">
            <div
              className="flex justify-center items-center gap-x-2 text-white bg-black px-4 cursor-pointer text-xs font-semibold border-2 py-2 rounded-xl hover:bg-white hover:text-black hover:border-black"
              onClick={() => {
                router.push("/information/informationForm");
                // setShowForm(!showForm);
              }}
            >
              Crear
              {/* <HiArrowSmRight /> */}
            </div>
          </div>
        </div>
        <table className="text-sm text-left w-full text-gray-500 ">
          <thead className="text-xs text-black ">
            <tr className="">
              {/* <th scope="col" className="px-3 py-2">
                Fecha
              </th> */}
              <th scope="col" className="px-3 py-2">
                Código
              </th>
              <th scope="col" className="px-3 py-2">
                Descripción
              </th>
              <th scope="col" className="px-3 py-2">
                Presentación
              </th>
              <th scope="col" className="px-3 py-2">
                Lote Sap
              </th>
              <th scope="col" className="  px-3 py-2">
                Cantidad Bulto
              </th>
              <th scope="col" className="px-3 py-2">
                Cantidad Saldo
              </th>
              <th scope="col" className="px-3 py-2">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {inventories.map((inventory) => (
              <InventoryCard inventory={inventory} key={inventory._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    "https://darling-cassata-6b0d17.netlify.app/api/inventory"
  );
  const data = await res.json();

  return {
    props: { data },
  };
}
