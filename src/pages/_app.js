import ProductContextComponent from "@/context/ContextProducts";
import ContextInformationComponent from "@/context/ContextInformation";
import "@/styles/globals.css";
import "../../styles/main.css";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <ContextInformationComponent>
      <ProductContextComponent>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProductContextComponent>
    </ContextInformationComponent>
  );
}
