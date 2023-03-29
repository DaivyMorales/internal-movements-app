import { productContext } from "@/context/ContextProducts";
import { useFormik } from "formik";
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

  const formik = useFormik({
    initialValues: { products },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      if (query.id) {
        const result = await updateProduct(query.id, values);
        console.log(result);
      } else {
        const result = await createProduct(values);
        console.log(result);
      }
      resetForm();
      push("/products");
      setShowForm(!showForm);
    },
  });

  const handleCodeChange = (event) => {
    const code = event.target.value;
    formik.setFieldValue("code", code);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
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
            onChange={handleCodeChange}
            value={products.code}
            placeholder="Ej: 1872720583"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-y-1">
          <label htmlFor="description">Descripción</label>
          <input
            className="inputForm"
            type="text"
            name="description"
            onChange={formik.handleChange}
            value={products.description}
            placeholder="Ej: Carrier"
          />
        </div>

        <div className="col-span-2 flex flex-col gap-y-1">
          <label htmlFor="presentation">Presentación</label>
          <input
            className="inputForm"
            type="number"
            name="presentation"
            onChange={formik.handleChange}
            value={products.presentation}
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
    </form>
  );
}
