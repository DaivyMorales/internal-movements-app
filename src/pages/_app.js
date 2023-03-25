import ProductContextComponent from "@/context/ContextProducts";
import ContextInformationComponent from "@/context/ContextInformation";
import "@/styles/globals.css";
<<<<<<< HEAD
import { Inter } from "@next/font/google";
import "../../styles/main.css";
=======
import { Inter } from '@next/font/google';
>>>>>>> 8c472f252fb581660257381eda69455d4c9b1ed7

export default function App({ Component, pageProps }) {
  return (
    <ContextInformationComponent>
      <ProductContextComponent>
        <Component {...pageProps} />
      </ProductContextComponent>
    </ContextInformationComponent>
  );
}
