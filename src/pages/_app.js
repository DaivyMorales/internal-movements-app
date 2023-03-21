import ProductContextComponent from "@/context/ContextProducts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ProductContextComponent>
      <Component {...pageProps} />
    </ProductContextComponent>
  );
}
