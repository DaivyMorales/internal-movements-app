import { createContext, useState } from "react";
import axios from "axios";

export const productContext = createContext();

export default function ProductContextComponent({ children }) {
  const [products, setProducts] = useState([]);

  const createProduct = async (newProduct) => {
    const response = await axios.post(
      "http://localhost:3000/api/products",
      newProduct
    );
    setProducts([...products, response.data]);
    return response.data;
  };

  const deleteProduct = async (productId) => {
    const response = await axios.delete(
      `https://darling-cassata-6b0d17.netlify.app/api/products/${productId}`
    );
    setProducts(products.filter((product) => product._id !== productId));
    return response.data;
  };

  const updateProduct = async (productId, product) => {
    const response = await axios.put(
      `http://localhost:3000/api/products/${productId}`,
      product
    );
    return response.data;
  };

  const getProduct = async (productId) => {
    try {
      const response = await axios.get(
        `https://darling-cassata-6b0d17.netlify.app/api/products/${productId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "https://darling-cassata-6b0d17.netlify.app/api/products"
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
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
        updateProduct,
        getProducts,
      }}
    >
      {children}
    </productContext.Provider>
  );
}
