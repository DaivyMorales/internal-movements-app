import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import InventoryCard from "@/components/inventory/InventoryCard";
import { contextInventory } from "@/context/ContextInventory";
import XLSX from "xlsx";
import ExportButton from "@/components/xlsx/ExportButton";

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

  const handleDownload = () => {
    const wb = XLSX.utils.table_to_book(document.querySelector("#my-table"), {
      sheet: "Sheet 1",
    });
    XLSX.writeFile(wb, "data.xlsx");
  };

  return (
    <div className=" flex justify-center items-center flex-col gap-y-2 px-4 ">
      <div className=" bg-white flex pt-2 flex-col justify-start items-center  overflow-x-auto shadow-xs rounded-lg  ">
        <div className="w-full grid grid-cols-2 ">
          <div className="px-3 flex flex-col justify-start items-start gap-y-2">
            <div className="flex justify-center items-center gap-x-1 ">
              <h2 className="font-black text-2xl text-black">Inventario</h2>
              <div className="p-1 bg-green-800 rounded-full">
                <p className="text-green-200 text-xs font-black ">
                  {inventories.length}
                </p>
              </div>
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
          <div className="flex justify-end items-end gap-x-2 px-3">
            <div
              className="create-button"
              onClick={() => {
                router.push("/inventory/InventoryForm");
                // setShowForm(!showForm);
              }}
            >
              Crear
              {/* <HiArrowSmRight /> */}
            </div>

            <ExportButton tableId="my-table" />
          </div>
        </div>
        <table
          id="my-table"
          className="text-sm text-left w-full text-gray-500 "
        >
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
                Cantidad TOTAL
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
