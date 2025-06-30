"use client";

import { useEffect, useRef, useState, useMemo,StrictMode } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import {
  AllCommunityModule,
  Theme, themeQuartz,
  colorSchemeDarkWarm,
  colorSchemeDarkBlue,
  colorSchemeLightWarm,
  colorSchemeLightCold,
} from "ag-grid-community";

import { PriceCellRenderer } from "./cell-renderers/PriceCellRenderer";

const myTheme = themeQuartz.withParams({
  // backgroundColor: "rgb(249, 245, 227)",
  // foregroundColor: "rgb(126, 46, 132)",
  // headerTextColor: "rgb(204, 245, 172)",
  // headerBackgroundColor: "rgb(209, 64, 129)",
  // oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
  // headerColumnResizeHandleColor: "rgb(126, 46, 132)",
  spacing: 10,
  oddRowBackgroundColor: '#8881',
  selectedRowBackgroundColor: 'rgba(0, 255, 0, 0.1)',
});

const themeLightWarm = themeQuartz.withPart(colorSchemeLightWarm);
const themeLightCold = themeQuartz.withPart(colorSchemeLightCold);
const themeDarkWarm = themeQuartz.withPart(colorSchemeDarkWarm);
const themeDarkBlue = themeQuartz.withPart(colorSchemeDarkBlue);

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
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 150;

  const containerStyle = useMemo(() => ({ width: "100%", height: "500px" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const theme = useMemo<Theme | "legacy">(() => {
    return myTheme;
  }, []);

  const activeSheet = boqData[activeSheetIndex];

  useEffect(() => {
    const container = tabContainerRef.current;
    const updateArrows = () => {
      if (container) {
        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(
          container.scrollWidth > container.clientWidth &&
          container.scrollLeft + container.clientWidth < container.scrollWidth
        );
      }
    };

    if (container) {
      updateArrows();
      container.addEventListener("scroll", updateArrows);
      window.addEventListener("resize", updateArrows);
    }

    return () => {
      container?.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [boqData]);

  const scrollLeft = () => {
    tabContainerRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    tabContainerRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const columnNameMap: Record<string, string> = {
    "descriere": "Descriere articol",
    "um": "UM",
    "q": "Q",
    "pu m": "PU manopera",
    "pu M": "PU material",
    "total m": "Total manopera",
    "total M": "Total material",
    "total": "Total General"
  };

  const checkboxColumn = {
  headerCheckboxSelection: true,
  checkboxSelection: true,
  width: 50,
  pinned: 'left',
  suppressSizeToFit: true,
};

const columnDefs = [
  checkboxColumn,
  ...(activeSheet?.headers.map((key) => {
    const colDef: any = {
      field: key,
      headerName: columnNameMap[key] || key,
    };

    // Descriere articol with auto-expanding height
    if (key === "descriere") {
      return {
        ...colDef,
        headerName: "Descriere articol",
        wrapText: true,
        autoHeight: true,
        minWidth: 500,
        cellStyle: {
          whiteSpace: "normal",
          lineHeight: "1.4",
        },
      };
    }

    // Editable price fields with euro formatting and validation
    if (key === "pu m" || key === "pu M") {
      return {
        ...colDef,
        editable: true,
        headerName: key === "pu m" ? "PU manopera" : "PU material",
        width: 145,
        valueSetter: (params: any) => {
          const raw = String(params.newValue).replace(",", ".");
          const newValue = parseFloat(raw);
          if (!isNaN(newValue) && newValue >= 0) {
            params.data[key] = newValue;
            return true;
          }
          return false;
        },
        cellRenderer: PriceCellRenderer,
      };
    }

    // Calculated totals
    if (key === "total m" || key === "total M") {
      return {
        ...colDef,
        headerName: key === "total m" ? "Total manopera" : "Total material",
        width: 150,
        valueGetter: (params: any) => {
          const q = parseFloat(params.data.q?.toString().replace(",", ".")) || 0;
          const pu = parseFloat(params.data[key === "total m" ? "pu m" : "pu M"]?.toString().replace(",", ".")) || 0;
          return q * pu;
        },
        cellRenderer: PriceCellRenderer,
      };
    }

    if (key === "total") {
      return {
        ...colDef,
        headerName: "Total General",
        width: 145,
        valueGetter: (params: any) => {
          const totalm = parseFloat(params.getValue("total m")?.toString().replace(",", ".")) || 0;
          const totalM = parseFloat(params.getValue("total M")?.toString().replace(",", ".")) || 0;
          return totalm + totalM;
        },
        cellRenderer: PriceCellRenderer,
      };
    }

    if (key === "q") {
      return {
        ...colDef,
        width: 100,
      };
    }
    if (key === "um") {
      return {
        ...colDef,
        width: 130,
      };
    }

    return colDef;
  }) || [])
];

  return (
    <div>
      {/* Tabs + arrows */}
      <div className="relative mb-4">
        {/* Left Fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white dark:from-black to-transparent z-10" />
        {/* Right Fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white dark:from-black to-transparent z-10" />

        {/* Arrows */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-brand-500 hover:bg-brand-600 text-white px-1.5 py-1"
          >
            ←
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-brand-500 hover:bg-brand-600 text-white px-1.5 py-1"
          >
            →
          </button>
        )}

        {/* Scrollable Tabs */}
        <div
          ref={tabContainerRef}
          className="flex gap-2 overflow-x-auto no-scrollbar px-10 py-2"
        >
          {boqData.map((sheet, idx) => (
            <button
              key={sheet.sheetName}
              onClick={() => setActiveSheetIndex(idx)}
              className={`px-4 py-1.5 text-sm rounded-full font-medium whitespace-nowrap transition-colors ${
                idx === activeSheetIndex
                  ? "bg-brand-500 text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700/80 dark:text-white/70 hover:bg-gray-300"
              }`}
            >
              {sheet.sheetName}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={containerStyle}>
        <div style={gridStyle}>
          <AgGridReact
            theme={myTheme}
            rowData={activeSheet?.rows}
            columnDefs={columnDefs}
            defaultColDef={{ resizable: true, sortable: true }}
            undoRedoCellEditing={true}
            undoRedoCellEditingLimit={20}
            rowSelection="multiple"
          />
        </div>
      </div>
    </div>
  );
}
