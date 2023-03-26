import { contextInformation } from "@/context/ContextInformation";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import InformationCard from "@/components/information/informationCard";
import { productContext } from "@/context/ContextProducts";
import { HiExclamation } from "react-icons/hi";

export default function ViewInformation({ data }) {
  const { informations, setInformations } = useContext(contextInformation);

  const { products, setProducts, getProducts } = useContext(productContext);

  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  useEffect(() => {
    setInformations(data);
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
              <h2 className="font-bold text-2xl text-black">
                Tabla de Información
              </h2>
              <p className="text-green-500 text-xs font-black">
                {informations.length}
              </p>
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="">Filtrar por Op</label>
              <input
                type="text"
                className="inputForm"
                onChange={handleOp}
                placeholder="Buscar..."
              />
            </div>
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
              <th scope="col" className="px-3 py-2">
                Op
              </th>
              <th scope="col" className="px-3 py-2">
                Código
              </th>
              <th scope="col" className="px-3 py-2">
                Descripcion
              </th>
              <th scope="col" className="px-3 py-2">
                Lote Sap
              </th>
              <th scope="col" className="px-3 py-2">
                Lote Proovedor
              </th>
              <th scope="col" className="  px-3 py-2">
                Paquetes E
              </th>
              <th scope="col" className="px-3 py-2">
                Saldos
              </th>
              <th scope="col" className="px-3 py-2">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {informations
              .filter((info) => {
                if (searchTerm == "") {
                  return info;
                } else if (info.op.toLowerCase().includes(searchTerm)) {
                  return info;
                }
              })
              .map((info) => (
                <InformationCard info={info} key={info._id} />
              ))}
          </tbody>
        </table>
      </div>
      <div className="px-3 py-2 bg-yellow-200 rounded-lg">
        <HiExclamation />
        <p className="text-xs font-semibold ">
          <span className="font-bold">Nota:</span> Si ha hecho algun cambio y no
          se ve actualizado,
          <br /> se recomienda refrescar la pagina.
        </p>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    "https://darling-cassata-6b0d17.netlify.app/api/information"
  );
  const data = await res.json();

  return {
    props: { data },
  };
}
