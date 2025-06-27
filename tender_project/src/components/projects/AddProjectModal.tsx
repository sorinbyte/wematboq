"use client";
import React, { useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import DatePicker from "../form/date-picker";
import Select from "../form/Select";



const valueOptions = [
  { value: "EUR_0_250K", label: "€0 – €250k" },
  { value: "EUR_250K_500K", label: "€250k – €500k" },
  { value: "EUR_500K_1M", label: "€500k – €1M" },
  { value: "EUR_1M_PLUS", label: "€1M+" },
  { value: "EUR_5M_PLUS", label: "€5M+" },
];

export default function AddProjectModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [projectname, setProjectname] = useState("");
  const [client, setClient] = useState("");
  const [projectvalue, setProjectvalue] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [projectStart, setProjectStart] = useState("");
  const [projectEnd, setProjectEnd] = useState("");

  const handleSave = async () => {
  try {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectname,
        client,
        projectvalue,
        country,
        city,
        addressLine,
        projectstart: projectStart
          ? new Date(projectStart).toISOString()
          : null,
        projectend: projectEnd
          ? new Date(projectEnd).toISOString()
          : null,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 409 && result?.error) {
        alert(result.error); // custom unique error
      } else {
        alert("A apărut o eroare la salvarea proiectului.");
      }
      return;
    }

    console.log("Proiect creat:", result);
    onClose();
  } catch (err) {
    console.error("Eroare:", err);
    alert("A apărut o eroare la salvarea proiectului.");
  }
};

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[800px] m-4">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Adaugă Proiect
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Completează informațiile proiectului.
          </p>
        </div>

        <form className="flex flex-col">
          <div className="px-2 overflow-y-auto custom-scrollbar space-y-10">
            <div>
              <h5 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
                Informații de bază
              </h5>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Nume Proiect</Label>
                  <Input
                    type="text"
                    placeholder="Ex: Sediu Nou Coca-Cola"
                    value={projectname}
                    onChange={(e) => setProjectname(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Client</Label>
                  <Input
                    type="text"
                    placeholder="Ex: Coca-Cola HBC"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Valoare</Label>
                  <Select
                    options={valueOptions}
                    placeholder="Selectează intervalul"
                    onChange={(val: { value: string; label: string } | null) =>
                      setProjectvalue(val?.value || "")
                    }
                  />
                </div>
                <div>
                  <Label>Țară</Label>
                  <Input
                    type="text"
                    placeholder="Ex: Romania"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Oraș / Județ</Label>
                  <Input
                    type="text"
                    placeholder="Ex: Cluj-Napoca"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Adresă</Label>
                  <Input
                    type="text"
                    placeholder="Ex: Bd. Eroilor 23"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                  />
                </div>
                <div>
                  <DatePicker
                    id="projectStart"
                    label="Start Proiect"
                    placeholder="YYYY-MM-DD"
                    onDateChange={(val: string) => setProjectStart(val)}
                  />
                </div>
                <div>
                  <DatePicker
                    id="projectEnd"
                    label="Final Proiect"
                    placeholder="YYYY-MM-DD"
                    onDateChange={(val: string) => setProjectEnd(val)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={onClose}>
              Anulează
            </Button>
            <Button size="sm" onClick={handleSave}>
              Salvează Proiectul
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}