import { productContext } from "@/context/ContextProducts";
import { Formik, Form } from "formik";
import { useContext, useState } from "react";
import { useRouter } from "next/router";

export default function ProductForm() {
  const { createProduct } = useContext(productContext);

  const router = useRouter();

  const [newProduct, setNewProduct] = useState({
    code: "",
    description: "",
    presentation: 0,
  });

  return (
    <div>
      <h1>Formulario</h1>
      <Formik
        initialValues={newProduct}
        onSubmit={(values, { resetForm }) => {
          const result = createProduct(values);
          console.log(result);
          resetForm();
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <label htmlFor="code">Código</label>
            <input type="text" name="code" onChange={handleChange} />
            <label htmlFor="description">Descripción</label>
            <input type="text" name="description" onChange={handleChange} />
            <label htmlFor="presentation">Presentación</label>
            <input
              type="number"
              name="codpresentation"
              onChange={handleChange}
            />
            <button type="submit">Crear</button>
          </Form>
        )}
      </Formik>
      <button onClick={() => router.push("/products")}>Ver</button>
    </div>
  );
}
