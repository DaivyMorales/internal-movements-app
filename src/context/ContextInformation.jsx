import { createContext, useState } from "react";
import axios from "axios";

export const contextInformation = createContext();

export default function ContextInformationComponent({ children }) {
  const [informations, setInformations] = useState([]);

  const createInformation = async (information) => {
    const response = await axios.post(
      "https://darling-cassata-6b0d17.netlify.app/api/information",
      information
    );
    setInformations([...informations, response.data]);
    console.log(response.data);
    return response.data;
  };

  const deleteInformation = async (informationId) => {
    const response = await axios.delete(
      `https://darling-cassata-6b0d17.netlify.app/api/information/${informationId}`
    );
    setInformations(informations.filter((info) => info._id !== informationId));
    return response.data;
  };

  return (
    <contextInformation.Provider
      value={{
        informations,
        setInformations,
        createInformation,
        deleteInformation,
      }}
    >
      {children}
    </contextInformation.Provider>
  );
}
