import { createContext, useState } from "react";
import axios from "axios";

export const contextInformation = createContext();

export default function ContextInformationComponent({ children }) {
  const [informations, setInformations] = useState([]);

  const createInformation = async (information) => {
    const response = await axios.post(
      "http://localhost:3000/api/information",
      information
    );
    setInformations([...informations, response.data]);
    console.log(response.data);
    return response.data;
  };

  const deleteInformation = async (informationId) => {
    const response = await axios.delete(
      `http://localhost:3000/api/information/${informationId}`
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
