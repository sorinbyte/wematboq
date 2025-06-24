"use client";

import React, { useState } from "react";

interface BoqSheet {
  sheetName: string;
  headers: string[];
  rows: any[];
}

interface CreatePackageFormProps {
  boqData: BoqSheet[];
  onClose: () => void;
  onSave: (pkg: { name: string; description: string }) => void;
}

export default function CreatePackageForm({ boqData, onClose, onSave }: CreatePackageFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (!name.trim()) return alert("Numele este obligatoriu");
    onSave({ name, description });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md space-y-4">
      <h2 className="text-lg font-semibold">Creează Pachet</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nume pachet"
        className="w-full border p-2 rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descriere scurtă"
        className="w-full border p-2 rounded"
      />
      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Anulează</button>
        <button onClick={handleSave} className="px-4 py-2 bg-brand-500 text-white rounded">Salvează</button>
      </div>
    </div>
  );
}