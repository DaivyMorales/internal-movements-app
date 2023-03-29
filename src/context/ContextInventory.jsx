import { createContext, useState } from "react";
import axios from "axios";

export const contextInventory = createContext();

export default function ContextInventoryComponent({ children }) {
  const [inventories, setInventories] = useState([]);

  const createInventory = async (Inventory) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/inventory",
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
        `http://localhost:3000/api/inventory/${inventoryId}`
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
        `http://localhost:3000/api/inventory/${inventoryId}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateInventory = async (inventoryId, inventory) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/inventory/${inventoryId}`,
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
