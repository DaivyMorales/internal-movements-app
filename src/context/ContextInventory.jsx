import { createContext, useState } from "react";
import axios from "axios";

export const contextInventory = createContext();

export default function ContextInventoryComponent({ children }) {
  const [inventories, setInventories] = useState([]);

  const createInventory = async (Inventory) => {
    try {
      const response = await axios.post(
        "https://darling-cassata-6b0d17.netlify.app/api/inventory",
        Inventory
      );
      setInventories([...inventories, response.data]);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteInventory = async (inventoryId) => {
    try {
      const response = await axios.delete(
        `https://darling-cassata-6b0d17.netlify.app/api/inventory/${inventoryId}`
      );
      setInventories(
        inventories.filter((info) => info._id !== inventoryId)
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getInventory = async (inventoryId) => {
    try {
      const response = await axios.get(
        `https://darling-cassata-6b0d17.netlify.app/api/inventory/${inventoryId}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateInventory = async (inventoryId, inventory) => {
    try {
      const response = await axios.put(
        `https://darling-cassata-6b0d17.netlify.app/api/inventory/${inventoryId}`,
        inventory
      );
      setInventories(
        inventories.map((info) => {
          if (info._id === inventoryId) {
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
    <contextInventory.Provider
      value={{
        inventories,
        setInventories,
        createInventory,
        deleteInventory,
        getInventory,
        updateInventory,
      }}
    >
      {children}
    </contextInventory.Provider>
  );
}
