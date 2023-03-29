import { useEffect } from "react";
import * as XLSX from "xlsx";

export default function ExportButton({ tableId }) {
  const handleDownload = () => {
    const wb = XLSX.utils.table_to_book(document.querySelector(`#${tableId}`), {
      sheet: "Sheet 1",
    });
    XLSX.writeFile(wb, "data.xlsx");
  };

  useEffect(() => {
    const button = document.querySelector("#export-button");
    button.addEventListener("click", handleDownload);

    return () => {
      button.removeEventListener("click", handleDownload);
    };
  }, []);

  return (
    <div
      id="export-button"
      className="flex justify-center items-center gap-x-2 text-white bg-black px-4 cursor-pointer text-xs font-semibold border-2 py-2 rounded-xl hover:bg-white hover:text-black hover:border-black"
    >
      Exportar Excel
    </div>
  );
}
