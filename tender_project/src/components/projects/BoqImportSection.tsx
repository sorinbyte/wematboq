"use client";

import React, { useRef, useState } from "react";
import { parseBoq } from "@/utils/parseBoq";
import BoqViewer from "./BoqViewer";

interface BoqSheet {
  sheetName: string;
  headers: string[];
  rows: any[];
}

interface Props {
  projectId: number;
  boqData: BoqSheet[] | null;
  setBoqData: (data: BoqSheet[] | null) => void;
  boqStatus: "idle" | "previewing" | "accepted";
  setBoqStatus: (status: "idle" | "previewing" | "accepted") => void;
  uploadedById: number;
}

export default function BoqImportSection({
  projectId,
  boqData,
  setBoqData,
  boqStatus,
  setBoqStatus,
  uploadedById,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const parsedArray = parseBoq(arrayBuffer);
      console.log("Parsed BOQ Data:", parsedArray);

      const withHeaders: BoqSheet[] = parsedArray.map((sheet) => ({
        ...sheet,
        headers: sheet.rows.length ? Object.keys(sheet.rows[0]) : [],
      }));

      setBoqData(withHeaders);
      setBoqStatus("previewing");
    } catch (err) {
      console.error("Error parsing BOQ:", err);
    }
  };

  const handleAccept = async () => {
    if (!boqData) return;
    setSaving(true);

    try {
      const response = await fetch(`/api/projects/${projectId}/boq`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boqSheets: boqData, uploadedById }),
      });

      if (response.ok) {
        setBoqStatus("accepted");
      } else {
        const errorText = await response.text();
        console.error("Failed to save BOQ:", response.status, errorText);
      }
    } catch (error) {
      console.error("Error saving BOQ:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setBoqData(null);
    setBoqStatus("idle");
  };

  return (
    <div className="mt-6 max-w-screen-2xl w-full mx-auto rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
        {boqStatus === "accepted" ? "Lista cantități" : "Importă BOQ"}
      </h3>

      {boqStatus === "idle" && (
        <>
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
        </>
      )}

      {boqStatus === "previewing" && boqData && (
        <>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleAccept}
              disabled={saving}
              className="px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600 disabled:opacity-50"
            >
              {saving ? "Se salvează..." : "Acceptă BOQ"}
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Anulează
            </button>
          </div>
          <div className="mt-6">
            <BoqViewer boqData={boqData} />
          </div>
        </>
      )}

      {boqStatus === "accepted" && boqData && (
        <div className="mt-6">
          <BoqViewer boqData={boqData} />
        </div>
      )}
    </div>
  );
}