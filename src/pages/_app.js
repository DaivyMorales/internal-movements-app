import ProductContextComponent from "@/context/ContextProducts";
import ContextInformationComponent from "@/context/ContextInformation";
import "@/styles/globals.css";
import { Inter } from '@next/font/google';

export default function App({ Component, pageProps }) {
  return (
    <ContextInformationComponent>
      <ProductContextComponent>
        <Component {...pageProps} />
      </ProductContextComponent>
    </ContextInformationComponent>
  );
}
