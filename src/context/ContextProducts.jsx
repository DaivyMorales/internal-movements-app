import { createContext, useState } from "react";
import axios from "axios";

export const productContext = createContext();

export default function ProductContextComponent({ children }) {
  const [products, setProducts] = useState([]);

  const createProduct = async (newProduct) => {
    const response = await axios.post(
      "https://internal-movements-app.vercel.app",
      newProduct
    );
    setProducts([...products, response.data]);
    return response.data;
  };

  const deleteProduct = async (productId) => {
    const response = await axios.delete(
      `https://internal-movements-app.vercel.app/${productId}`
    );
    setProducts(products.filter((product) => product._id !== productId));
    return response.data;
  };

  const updateProduct = async (productId, product) => {
    const response = await axios.put(
      `https://internal-movements-app.vercel.app/${productId}`,
      product
    );
    return response.data;
  };

  const getProduct = async (productId) => {
    const response = await axios.get(
      `https://internal-movements-app.vercel.app/api/products/${productId}`
    );
    return response.data;
  };

  return (
    <productContext.Provider
      value={{
        products,
        setProducts,
        createProduct,
        deleteProduct,
        updateProduct,
        getProduct,
        updateProduct
      }}
    >
      {children}
    </productContext.Provider>
  );
}
