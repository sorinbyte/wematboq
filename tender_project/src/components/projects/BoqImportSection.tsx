"use client";

import React, { useRef, useState } from "react";
import { parseBoq } from "@/utils/parseBoq"; // adjust path if needed
import BoqViewer from "./BoqViewer";

interface BoqSheet {
  sheetName: string;
  headers: string[];
  rows: any[];
}

export default function BoqImportSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [boqData, setBoqData] = useState<BoqSheet[] | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("Uploading file:", file.name);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const parsedArray = parseBoq(arrayBuffer); // BoqSheet[]

      // Ensure headers are set correctly for each sheet
      const withHeaders: BoqSheet[] = parsedArray.map((sheet) => ({
        ...sheet,
        headers: sheet.rows.length ? Object.keys(sheet.rows[0]) : [],
      }));

      setBoqData(withHeaders);
    } catch (err) {
      console.error("Error parsing BOQ:", err);
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        Importă BOQ
      </h3>

      <div
        className="relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:border-brand-500"
        onClick={() => fileInputRef.current?.click()}
      >
        <svg
          className="w-10 h-10 mb-3 text-gray-400 dark:text-white/40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5V17a2.5 2.5 0 002.5 2.5H18.5A2.5 2.5 0 0021 17v-0.5M16 3l-4-4m0 0L8 3m4-4v13"
          />
        </svg>
        <p className="text-gray-600 dark:text-white/60">
          Click pentru a selecta fișierul sau trage-l aici.
        </p>
        <input
          type="file"
          accept=".xlsx,.xls"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <p className="mt-3 text-sm text-gray-500 dark:text-white/40">
        Formate acceptate: .xlsx, .xls. Fiecare sheet va fi procesat individual.
      </p>

      {boqData && (
        <div className="mt-8">
          <BoqViewer boqData={boqData} />
        </div>
      )}
    </div>
  );
}