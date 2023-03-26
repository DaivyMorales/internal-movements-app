import { createContext, useState } from "react";
import axios from "axios";

export const productContext = createContext();

export default function ProductContextComponent({ children }) {
  const [products, setProducts] = useState([]);
  console.log(products);

  const createProduct = async (newProduct) => {
    const response = await axios.post(
      "https://darling-cassata-6b0d17.netlify.app/api/products",
      newProduct
    );
    setProducts([...products, response.data]);
    return response.data;
  };

  const deleteProduct = async (productId) => {
    const response = await axios.delete(
      `https://darling-cassata-6b0d17.netlify.app/api/products/${productId}`
    );
    setProducts(products.filter((product) => product.code !== productId));
    return response.data;
  };

  const updateProduct = async (productId, product) => {
    const response = await axios.put(
      `https://darling-cassata-6b0d17.netlify.app/api/products/${productId}`,
      product
    );
    setProducts(
      products.map((product) => {
        if (product._id === productId) {
          return response.data;
        } else {
          return product;
        }
      })
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
      console.log(error.request.status);
      return error.request.status;
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
