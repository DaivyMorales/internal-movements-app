import { useEffect } from "react";
import * as XLSX from "xlsx";
import { SiMicrosoftexcel } from "react-icons/si";

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
      className="excel-button"
    >
      Exportar a Excel
      <SiMicrosoftexcel color="whites"/>
    </div>
  );
}
