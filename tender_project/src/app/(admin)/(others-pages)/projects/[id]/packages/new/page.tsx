"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface BoqSheet {
  sheetName: string;
  headers: string[];
  rows: any[];
}

export default function NewPackagePage() {
  const [packageName, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [boqData, setBoqData] = useState<BoqSheet[] | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const name = searchParams.get("name") || "";
    const desc = searchParams.get("description") || "";
    setPackageName(name);
    setDescription(desc);

    // Optionally fetch BOQ data from backend/localStorage if needed
    const stored = localStorage.getItem("boqData");
    if (stored) setBoqData(JSON.parse(stored));
  }, [searchParams]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pachet nou: {packageName}</h1>
      <p className="text-gray-600 mb-6">{description}</p>

      {boqData ? (
        <div>
          {/* Example rendering sheet names */}
          {boqData.map((sheet, index) => (
            <div key={index} className="mb-4">
              <h2 className="font-semibold text-lg">{sheet.sheetName}</h2>
              <p>{sheet.rows.length} rânduri</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Se încarcă datele BOQ...</p>
      )}
    </div>
  );
}