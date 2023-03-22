import axios from "axios";

export default function ProductDetail({ product }) {
  return (
    <div>
      <h1>ProductDetail</h1>
      <p>{product.description}</p>
    </div>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(
    `https://internal-movements-app.vercel.app/api/products/${id}`
  );

  if (res.status === 200) {
    const product = await res.json();
    return {
      props: {
        product,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}
