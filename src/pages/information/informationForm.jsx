import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { contextInformation } from "@/context/ContextInformation";
import { productContext } from "@/context/ContextProducts";

export default function InformationForm({ data }) {
  // console.log("DATA", data);
  const { createInformation, getInformation, updateInformation } =
    useContext(contextInformation);
  const { products, setProducts, getProducts, getProduct } =
    useContext(productContext);

  const { push, query } = useRouter();

  const [productsForm, setProductsForm] = useState({
    op: Number,
    product: null,
    sap_lot: "",
    provider_lot: "",
    packages_delivered: Number,
    balances: Number,
  });

  console.log("PRODUCT FORM", productsForm);

  console.log("productForm.product =", productsForm.product);

  const [productFoundForm, setProductFoundForm] = useState(null);

  const loadInformation = async (idInformation) => {
    const response = await getInformation(idInformation);
    setProductsForm({
      op: response.op,
      product: response.product,
      sap_lot: response.sap_lot,
      provider_lot: response.provider_lot,
      packages_delivered: response.packages_delivered,
      balances: response.balances,
    });
  };

  const formik = useFormik({
    initialValues: { productsForm },
    onSubmit: async (productsForm, { resetForm }) => {
      if (query.id) {
        const result = await updateInformation(
          query.id,
          productsForm.productsForm
        );
        console.log(result);
        console.log("finals values", productsForm);
        resetForm();
        push("/information");
      } else {
        const result = await createInformation(productsForm.productsForm);
        console.log(result);
        resetForm();
        push("/information");
      }
    },
    enableReinitialize: true,
  });

  const loadProducts = async () => {
    const response = await getProducts();
    setProducts(response);
  };

  useEffect(() => {
    loadProducts();

    if (query.id) {
      loadInformation(query.id);
    }
  }, []);

  useEffect(() => {
    if (productsForm.product !== null) {
      if (productsForm.product.length >= 8) {
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
    }
  }, [productsForm.product, products]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductsForm((prevProducts) => ({ ...prevProducts, [name]: value }));
  };

  const handleSapLotChange = (event) => {
    const sap_lot = event.target.value;
    formik.setFieldValue("sap_lot", sap_lot);
    setProductsForm({ ...productsForm, sap_lot: sap_lot });
  };

  const handleProviderLotChange = (event) => {
    const provider_lot = event.target.value;
    formik.setFieldValue("provider_lot", provider_lot);
    setProductsForm({ ...productsForm, provider_lot: provider_lot });
  };

  console.log("VALUES -->", formik.values);

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={formik.handleSubmit}>
        <div className="  container mx-auto flex flex-col gap-y-5 px-10">
          <h2 className="font-medium text-xl text-black">
            {query.id ? "Actualizar Información" : "Crear nueva Información"}
          </h2>

          <div className="flex flex-col gap-y-3">
            <label htmlFor="op">Op</label>
            <input
              className="inputForm"
              type="number"
              name="op"
              onChange={formik.handleChange && handleChange}
              value={productsForm.op}
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
                  <span className="text-red-500">Producto no encontrado</span>
                ) : (
                  productFoundForm
                )}{" "}
              </label>
            </div>
            <input
              className="inputForm"
              type="text"
              name="product"
              onChange={formik.handleChange && handleChange}
              value={productsForm.product}
              placeholder="Ej: 121212458"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="sap_lot">Lote Sap</label>
            <input
              className="inputForm"
              type="text"
              name="sap_lot"
              onChange={handleSapLotChange}
              value={productsForm.sap_lot}
              placeholder="Ej: 494-FEB23-1030"
            />
            {/* {console.log("values.sap_lot = ", values.sap_lot)} */}
          </div>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="provider_lot"> Lote Proveedor</label>
            <input
              className="inputForm"
              type="text"
              name="provider_lot"
              onChange={handleProviderLotChange}
              value={productsForm.provider_lot}
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
                onChange={formik.handleChange && handleChange}
                value={productsForm.packages_delivered}
                placeholder="Ej: 10"
              />
            </div>

            <div className="col-span-2 flex flex-col gap-y-3">
              <label htmlFor="balances"> Saldo</label>
              <input
                className="inputForm"
                type="number"
                name="balances"
                onChange={formik.handleChange && handleChange}
                value={productsForm.balances}
                // step="0.01"
                placeholder="Ej: 1.5"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-black text-white py-2 rounded-xl text-sm font-semibold"
          >
            {query.id ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    "https://darling-cassata-6b0d17.netlify.app/api/products"
  );
  const data = await res.json();
  return {
    props: { data },
  };
}
