import { createContext, useState } from "react";
import axios from "axios";

export const productContext = createContext();

export default function ProductContextComponent({ children }) {
  const [products, setProducts] = useState([]);

  const createProduct = async (newProduct) => {
    const response = await axios.post(
      "https://internal-movements-app.vercel.app/api/products",
      newProduct
    );
    setProducts([...products, response.data]);
    return response.data;
  };

  return (
    <productContext.Provider value={{ products, setProducts, createProduct }}>
      {children}
    </productContext.Provider>
  );
}
