import { productContext } from "@/context/ContextProducts";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home({ data }) {
  const { products, setProducts } = useContext(productContext);

  const router = useRouter();

  useEffect(() => {
    setProducts(data);
  }, [data]);

  return (
    <div>
      {data.map((d) => (
        <div key={d._id}>
          <h1>{d.description}</h1>
        </div>
      ))}
      <button
        onClick={() => {
          router.push("/products/productForm");
        }}
      >
        Crear producto
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();

  return {
    props: { data },
  };
}
