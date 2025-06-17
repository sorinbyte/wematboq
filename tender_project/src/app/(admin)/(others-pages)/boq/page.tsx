"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { ColDef, ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // optional: change if using a different theme

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { BoqItem } from "./interfaces";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

type FlatBoqRow = {
  sheetname: string;
  [key: string]: any;
};

const ExpandableCell = (props: any) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      onClick={() => setExpanded(!expanded)}
      title={props.value}
      style={{
        whiteSpace: expanded ? "normal" : "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer",
      }}
    >
      {props.value}
    </div>
  );
};

export default function BoqPage() {
  const gridRef = useRef<AgGridReact<FlatBoqRow>>(null);
  const [originalData, setOriginalData] = useState<FlatBoqRow[]>([]);
  const [rowData, setRowData] = useState<FlatBoqRow[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const [quickFilterText, setQuickFilterText] = useState<string>("");

  useEffect(() => {
    fetch("/data/boq_data.json")
      .then((res) => res.json())
      .then((data) => {
        const flattenedRows: FlatBoqRow[] = data.map((item: any) => {
          const raw = item.raw || {};
          const unmapped = raw.unmapped || {};
          return {
            sheetname: item.sheetname,
            ...raw,
            ...unmapped,
          };
        });

        const allKeys = new Set<string>();
        flattenedRows.forEach((row) =>
          Object.keys(row).forEach((key) => allKeys.add(key))
        );

        const generatedColumns: ColDef[] = Array.from(allKeys)
          .filter((key) => key !== "sheetname")
          .map((key) => ({
            field: key,
            headerName: key.replace(/\n/g, " ").replace(/_/g, " ").trim(),
            flex: key === "description" ? 3 : 1,
            cellRenderer: key === "description" ? ExpandableCell : undefined,
            resizable: true,
            sortable: true,
            filter: true,
          }));

        const uniqueSheets = Array.from(
          new Set(flattenedRows.map((row) => row.sheetname))
        );

        setOriginalData(flattenedRows);
        setRowData(flattenedRows);
        setColumnDefs(generatedColumns);
        setSheetNames(uniqueSheets);
      });
  }, []);

  const handleSheetClick = (sheet: string) => {
    setActiveSheet(sheet);
    setRowData(originalData.filter((row) => row.sheetname === sheet));
  };

  const handleShowAll = () => {
    setActiveSheet(null);
    setRowData(originalData);
  };

  const onFilterTextBoxChanged = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setQuickFilterText(e.target.value),
    []
  );

  return (
    <div>
      <PageBreadcrumb pageTitle="Lista BOQ" />

      {/* Sheet Filter Buttons */}
      <div className="flex flex-wrap gap-2 my-4">
        <button
          onClick={handleShowAll}
          className={`px-4 py-2 rounded-md border text-sm font-medium ${
            activeSheet === null
              ? "bg-blue-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          Show All
        </button>
        {sheetNames.map((sheet) => (
          <button
            key={sheet}
            onClick={() => handleSheetClick(sheet)}
            className={`px-4 py-2 rounded-md border text-sm font-medium ${
              activeSheet === sheet
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {sheet}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search BOQ..."
          className="border px-4 py-2 rounded-md w-full md:w-1/3"
          onChange={onFilterTextBoxChanged}
        />
      </div>

      {/* AG Grid */}
      <div className="ag-theme-quartz" style={{ width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          theme="legacy"
          rowData={rowData}
          columnDefs={columnDefs}
          quickFilterText={quickFilterText}
          defaultColDef={{
            flex: 1,
            wrapText: false,
            resizable: true,
            tooltipField: "value",
            cellClass: "whitespace-nowrap overflow-hidden text-ellipsis",
          }}
          pagination
          paginationPageSize={25}
          domLayout="autoHeight"
          suppressRowTransform
        />
      </div>
    </div>
  );
}