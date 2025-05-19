"use client";

import React, { useEffect, useState } from "react";
import { ColDef, ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { BoqItem } from "./interfaces"; // ✅ import from local boq folder

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

export default function BoqPage() {
  const [rowData, setRowData] = useState<BoqItem[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);

  useEffect(() => {
    fetch("/data/boq_data.json")
      .then((res) => res.json())
      .then((data) => {
        // Flatten 'raw' and 'unmapped'
        const flattenedRows = data.map((item: any) => {
          const raw = item.raw || {};
          const unmapped = raw.unmapped || {};
          return {
            sheetname: item.sheetname,
            ...raw,
            ...unmapped,
          };
        });

        // Collect all unique column keys
        const allKeys = new Set<string>();
        flattenedRows.forEach((row) =>
          Object.keys(row).forEach((key) => allKeys.add(key))
        );

        const generatedColumns: ColDef[] = Array.from(allKeys).map((key) => ({
          field: key,
          headerName: key.replace(/\n/g, " ").replace(/_/g, " ").trim(),
          wrapText: true,
          autoHeight: true,
          resizable: true,
          sortable: true,
          filter: true,
        }));

        setRowData(flattenedRows);
        setColumnDefs(generatedColumns);
      });
  }, []);

  return (
    <div>
      <PageBreadcrumb pageTitle="Lista BOQ" />
      <div
        className="ag-theme-alpine mt-6"
        style={{ width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            flex: 1,
            wrapText: true,
            autoHeight: true,
            resizable: true,
          }}
          pagination={true}
          paginationPageSize={25}
          domLayout="autoHeight"
          suppressRowTransform={true}
        />
      </div>
    </div>
  );
}