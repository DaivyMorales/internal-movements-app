import ProductContextComponent from "@/context/ContextProducts";
import ContextInformationComponent from "@/context/ContextInformation";
import ContextInventoryComponent from "@/context/ContextInventory";
import "@/styles/globals.css";
import "../../styles/main.css";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <ContextInformationComponent>
      <ContextInventoryComponent>
        <ProductContextComponent>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProductContextComponent>
      </ContextInventoryComponent>
    </ContextInformationComponent>
  );
}
