import { productContext } from "@/context/ContextProducts";
import { Formik, Form } from "formik";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProductForm() {
  const { createProduct, getProduct, updateProduct } =
    useContext(productContext);

  const { push, query } = useRouter();

  const [products, setProducts] = useState({
    code: "",
    description: "",
    presentation: 0,
  });

  const loadProduct = async (id) => {
    const res = await getProduct(id);
    console.log(res);
    setProducts({
      code: res.code,
      description: res.description,
      presentation: res.presentation,
    });
  };


  useEffect(() => {
    if (query.id) {
      loadProduct(query.id);
    }
  }, []);

  console.log(query.id);

  return (
    <div>
      <h1>{query.id ? "Actualizar Producto" : "Crear Producto"}</h1>
      <h1>Formulario</h1>
      <Formik
        enableReinitialize={true}
        initialValues={products}
        onSubmit={(values, { resetForm }) => {
          if (query.id) {
            const result = updateProduct(query.id, values);
            console.log(result);
          } else {
            const result = createProduct(values);
            console.log(result);
          }
          resetForm();
          push("/products");
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {/* {console.log(values)} */}
            <label htmlFor="code">Código</label>
            <input
              type="text"
              name="code"
              onChange={handleChange}
              value={values.code}
            />
            <label htmlFor="description">Descripción</label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              value={values.description}
            />
            <label htmlFor="presentation">Presentación</label>
            <input
              type="number"
              name="presentation"
              onChange={handleChange}
              value={values.presentation}
            />
            <button type="submit">Crear</button>
          </Form>
        )}
      </Formik>
      <button onClick={() => push("/products")}>Ver</button>
    </div>
  );
}
