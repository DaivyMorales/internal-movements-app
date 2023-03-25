import { contextInformation } from "@/context/ContextInformation";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import InformationCard from "@/components/information/informationCard";
import InformationForm from "./informationForm";

export default function ViewInformation({ data }) {
  const { informations, setInformations } = useContext(contextInformation);

  const [showForm, setShowForm] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setInformations(data);
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-colgap-y-2 px-4 ">
      <div className=" bg-white flex pt-2 flex-col justify-start items-center  overflow-x-auto shadow-xs rounded-lg  ">
        <div className="w-full grid grid-cols-2 ">
          <div className="px-3 flex">
            <h2 className="font-bold text-2xl text-black">
              Tabla de Información
            </h2>
            <p className="text-green-500 text-xs font-black">
              {informations.length}
            </p>
          </div>
          <div className="flex justify-end items-center px-3">
            <div
              className="flex justify-center items-center gap-x-2 text-white bg-black px-4 cursor-pointer text-xs font-semibold py-2 rounded-xl hover:bg-blue-500"
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
            {informations.map((info) => (
              <InformationCard info={info} key={info._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3000/api/information");
  const data = await res.json();

  return {
    props: { data },
  };
}
