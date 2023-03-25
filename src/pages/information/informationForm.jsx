import { Formik, Form } from "formik";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { contextInformation } from "@/context/ContextInformation";
import { productContext } from "@/context/ContextProducts";

export default function InformationForm({ data }) {
  const { createInformation } = useContext(contextInformation);
  const { products, setProducts } = useContext(productContext);

  const { push, query } = useRouter();

  const [productsForm, setProductsForm] = useState({
    op: 0,
    product: "",
    sap_lot: "",
    provider_lot: "",
    packages_delivered: 0,
    balances: 0,
  });
  const [productFoundForm, setProductFoundForm] = useState(null);

  // const loadProduct = async (id) => {
  //   const res = await getProduct(id);
  //   console.log(res);
  //   setProducts({
  //     code: res.code,
  //     description: res.description,
  //     presentation: res.presentation,
  //   });
  // };

  useEffect(() => {
    setProducts(data);
    if (productsForm.product.length >= 10) {
      const productFound = products.find(
        (product) => productsForm.product === product.code
      );

      if (productFound === undefined) {
        console.log("NOT FOUND");
        setProductFoundForm(0);
      } else {
        setProductFoundForm(productFound.description);
      }
    } else {
      setProductFoundForm(null);
    }
  }, [productsForm.product, products]);

  console.log(productFoundForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductsForm((prevProducts) => ({ ...prevProducts, [name]: value }));
  };

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <Formik
        enableReinitialize={true}
        initialValues={productsForm}
        onSubmit={(values, { resetForm }) => {
          //   if (query.id) {
          //     const result = updateProduct(query.id, values);
          //     console.log(result);
          //   } else {
          //     const result = createProduct(values);
          //     console.log(result);
          //   }
          const result = createInformation(values);
          console.log(result);
          resetForm();
          push("/information");
        }}
      >
        {({ values, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="  container mx-auto flex flex-col gap-y-5 px-10">
              <h2 className="font-medium text-xl text-black">
                Crear nueva Información
              </h2>
              <div className="flex flex-col gap-y-3">
                <label htmlFor="op">Op</label>
                <input
                  className="inputForm"
                  type="number"
                  name="op"
                  onChange={handleChange}
                  value={values.op}
                  placeholder="Ej: 512"
                />
              </div>

              <div className="flex flex-col gap-y-3">
                <div className="grid grid-cols-2">
                  <label htmlFor="product">Código </label>
                  <label
                    htmlFor=""
                    className="text-right text-sm font-bold text-gray-600"
                  >
                    {" "}
                    {productFoundForm === 0 ? (
                      <span className="text-red-500">
                        Producto no encontrado
                      </span>
                    ) : (
                      productFoundForm
                    )}{" "}
                  </label>
                </div>
                <input
                  className="inputForm"
                  type="text"
                  name="product"
                  onChange={handleChange}
                  value={values.product}
                  placeholder="Ej: 121212458"
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <label htmlFor="sap_lot">Lote Sap</label>
                <input
                  className="inputForm"
                  type="text"
                  name="sap_lot"
                  onChange={handleChange}
                  value={values.sap_lot}
                  placeholder="Ej: 494-FEB23-1030"
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <label htmlFor="provider_lot"> Lote Proveedor</label>
                <input
                  className="inputForm"
                  type="text"
                  name="provider_lot"
                  onChange={handleChange}
                  value={values.provider_lot}
                  placeholder="Ej: 276326376Y"
                />
              </div>
              <div className="grid grid-cols-3 gap-x-5">
                <div className="flex flex-col gap-y-3">
                  <label htmlFor="packages_delivered"> Entregados</label>
                  <input
                    className="inputForm"
                    type="number"
                    name="packages_delivered"
                    onChange={handleChange}
                    value={values.packages_delivered}
                  />
                </div>

                <div className="col-span-2 flex flex-col gap-y-3">
                  <label htmlFor="balances"> Saldo</label>
                  <input
                    className="inputForm"
                    type=""
                    name="balances"
                    onChange={handleChange}
                    value={values.balances}
                    step="0.01"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-black text-white py-2 rounded-xl text-sm font-semibold"
              >
                Crear
              </button>
            </div>
          </Form>
        )}
      </Formik>
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
