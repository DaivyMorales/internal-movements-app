import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { productContext } from "@/context/ContextProducts";
import { contextInventory } from "@/context/ContextInventory";

export default function InventoryForm({ data }) {
  const { createInventory, getInventory, updateInventory } =
    useContext(contextInventory);
  const { products, setProducts, getProducts } = useContext(productContext);

  const { push, query } = useRouter();

  const [inventoryForm, setInventoryForm] = useState({
    product: null,
    sap_lot: "",
    bulk_quantity: Number,
    balance_quantity: Number,
  });

  console.log("INVENTORY FORM", inventoryForm);

  console.log("inventoryForm.product =", inventoryForm.product);

  const [productFoundForm, setProductFoundForm] = useState(null);

  const loadInventory = async (idInventory) => {
    const response = await getInventory(idInventory);
    setInventoryForm({
      product: response.product,
      sap_lot: response.sap_lot,
      bulk_quantity: response.bulk_quantity,
      balance_quantity: response.balance_quantity,
    });
  };

  const formik = useFormik({
    initialValues: { inventoryForm },
    onSubmit: async (inventoryForm, { resetForm }) => {
      if (query.id) {
        const result = await updateInventory(
          query.id,
          inventoryForm.inventoryForm
        );
        console.log(result);
        console.log("finals values", inventoryForm);
        resetForm();
        push("/inventory");
      } else {
        const result = await createInventory(inventoryForm.inventoryForm);
        console.log(result);
        resetForm();
        push("/inventory");
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
      loadInventory(query.id);
    }
  }, []);

  useEffect(() => {
    if (inventoryForm.product !== null) {
      if (inventoryForm.product.length >= 8) {
        const productFound = products.find(
          (product) => inventoryForm.product === product.code
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
  }, [inventoryForm.product, products]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInventoryForm((prevInventory) => ({ ...prevInventory, [name]: value }));
  };

  const handleSapLotChange = (event) => {
    const sap_lot = event.target.value;
    formik.setFieldValue("sap_lot", sap_lot);
    setInventoryForm({ ...inventoryForm, sap_lot: sap_lot });
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
              value={inventoryForm.product}
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
              value={inventoryForm.sap_lot}
              placeholder="Ej: 494-FEB23-1030"
            />
            {/* {console.log("values.sap_lot = ", values.sap_lot)} */}
          </div>

          <div className="flex flex-col gap-y-3">
            <label htmlFor="provider_lot">Cantidad Bultos</label>
            <input
              className="inputForm"
              type="number"
              name="bulk_quantity"
              onChange={formik.handleChange && handleChange}
              value={inventoryForm.bulk_quantity}
              placeholder="Ej: 276326376Y"
            />
          </div>

          <div className="flex flex-col gap-y-3">
            <label htmlFor="op">Cantidad Saldo</label>
            <input
              className="inputForm"
              type="number"
              name="balance_quantity"
              onChange={formik.handleChange && handleChange}
              value={inventoryForm.balance_quantity}
              placeholder="Ej: 512"
            />
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
