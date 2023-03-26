import { productContext } from "@/context/ContextProducts";
import { Formik, Form } from "formik";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProductForm({ showForm, setShowForm }) {
  const { createProduct, getProduct, updateProduct } =
    useContext(productContext);

  const { push, query } = useRouter();

  const [products, setProducts] = useState({
    code: "",
    description: "",
    presentation: Number,
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
        setShowForm(!showForm);
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className=" px-24  py-6 rounded-xl flex flex-col gap-y-2 justify-center items-center ">
            <h1></h1>
            <h2 className="font-bold text-2xl text-black">
              {query.id ? "Actualizar Producto" : "Crear Producto"}
            </h2>
            <div className="col-span-2 flex flex-col gap-y-1">
              <label htmlFor="code">Código</label>
              <input
                className="inputForm"
                type="text"
                name="code"
                onChange={handleChange}
                value={values.code}
                placeholder="Ej: 1872720583"
              />
            </div>
            <div className="col-span-2 flex flex-col gap-y-1">
              <label htmlFor="description">Descripción</label>
              <input
                className="inputForm"
                type="text"
                name="description"
                onChange={handleChange}
                value={values.description}
                placeholder="Ej: Carrier"
              />
            </div>

            <div className="col-span-2 flex flex-col gap-y-1">
              <label htmlFor="presentation">Presentación</label>
              <input
                className="inputForm"
                type="number"
                name="presentation"
                onChange={handleChange}
                value={values.presentation}
                placeholder="Ej: 12"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white py-2 rounded-xl text-sm  border-2 font-semibold px-14 hover:bg-white hover:text-black hover: border-black"
            >
              {query.id ? "Actualizar" : "Crear"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
