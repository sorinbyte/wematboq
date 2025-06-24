"use client";

import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";

// Register AG Grid Community Modules globally
ModuleRegistry.registerModules([AllCommunityModule]);

interface BoqViewerProps {
  boqData: {
    sheetName: string;
    headers: string[];
    rows: any[];
  }[];
}

export default function BoqViewer({ boqData }: BoqViewerProps) {
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);

  const activeSheet = boqData[activeSheetIndex];

  const columnDefs =
    activeSheet?.headers.map((key) => {
      if (key === "pu m" || key === "pu M") {
        return {
          field: key,
          editable: true,
        };
      }

      if (key === "total m") {
        return {
          field: key,
          valueGetter: (params: any) => {
            const q = parseFloat(params.data.q) || 0;
            const pu = parseFloat(params.data["pu m"]) || 0;
            return (q * pu).toFixed(2);
          },
        };
      }

      if (key === "total M") {
        return {
          field: key,
          valueGetter: (params: any) => {
            const q = parseFloat(params.data.q) || 0;
            const pu = parseFloat(params.data["pu M"]) || 0;
            return (q * pu).toFixed(2);
          },
        };
      }

      if (key === "total") {
        return {
          field: key,
          valueGetter: (params: any) => {
            const totalm = parseFloat(params.getValue("total m")) || 0;
            const totalM = parseFloat(params.getValue("total M")) || 0;
            return (totalm + totalM).toFixed(2);
          },
        };
      }

      return { field: key };
    }) || [];

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {boqData.map((sheet, idx) => (
          <button
            key={sheet.sheetName}
            className={`px-4 py-2 rounded ${
              idx === activeSheetIndex
                ? "bg-brand-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveSheetIndex(idx)}
          >
            {sheet.sheetName}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="ag-theme-quartz" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={activeSheet?.rows}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          defaultColDef={{ resizable: true, sortable: true }}
        />
      </div>
    </div>
  );
}