import { createContext, useState } from "react";
import axios from "axios";

export const contextInformation = createContext();

export default function ContextInformationComponent({ children }) {
  const [informations, setInformations] = useState([]);

  const createInformation = async (information) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/information",
        information
      );
      setInformations([...informations, response.data]);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteInformation = async (informationId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/information/${informationId}`
      );
      setInformations(
        informations.filter((info) => info._id !== informationId)
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getInformation = async (informationId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/information/${informationId}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateInformation = async (informationId, information) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/information/${informationId}`,
        information
      );
      setInformations(
        informations.map((info) => {
          if (info._id === informationId) {
            return response.data;
          } else {
            return info;
          }
        })
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <contextInformation.Provider
      value={{
        informations,
        setInformations,
        createInformation,
        deleteInformation,
        getInformation,
        updateInformation,
      }}
    >
      {children}
    </contextInformation.Provider>
  );
}
