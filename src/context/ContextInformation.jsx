import { createContext, useState } from "react";
import axios from "axios";

export const contextInformation = createContext();

export default function ContextInformationComponent({ children }) {
  const [informations, setInformations] = useState([]);

  const createInformation = async (information) => {
    const response = await axios.post(
<<<<<<< HEAD
      "https://internal-movements-app.vercel.app/api/information",
=======
      "http://localhost:3000/api/information",
>>>>>>> 8c472f252fb581660257381eda69455d4c9b1ed7
      information
    );
    setInformations([...informations, response.data]);
    console.log(response.data);
    return response.data;
  };

  const deleteInformation = async (informationId) => {
    const response = await axios.delete(
<<<<<<< HEAD
      `https://internal-movements-app.vercel.app/api/information/${informationId}`
=======
      `http://localhost:3000/api/information/${informationId}`
>>>>>>> 8c472f252fb581660257381eda69455d4c9b1ed7
    );
    setInformations(informations.filter((info) => info._id !== informationId));
    return response.data;
  };

  return (
    <contextInformation.Provider
      value={{ informations, setInformations, createInformation, deleteInformation }}
    >
      {children}
    </contextInformation.Provider>
  );
}
