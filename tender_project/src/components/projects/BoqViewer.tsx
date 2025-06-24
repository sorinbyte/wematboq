"use client";

import { useEffect, useRef, useState } from "react";
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
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 150;

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
      {/* Tabs + arrows */}
      <div className="relative flex items-center mb-4">
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 bg-gray-200 px-2 py-1 rounded-l hover:bg-gray-300"
          >
            ←
          </button>
        )}

        <div
          ref={tabContainerRef}
          className="flex overflow-x-auto no-scrollbar px-6"
          style={{ scrollBehavior: "smooth" }}
        >
          {boqData.map((sheet, idx) => (
            <button
              key={sheet.sheetName}
              className={`px-4 py-2 mr-2 rounded whitespace-nowrap ${
                idx === activeSheetIndex
                  ? "bg-brand-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setActiveSheetIndex(idx)}
            >
              {sheet.sheetName}
            </button>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 bg-gray-200 px-2 py-1 rounded-r hover:bg-gray-300"
          >
            →
          </button>
        )}
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