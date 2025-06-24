"use client";
import React from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import DatePicker from "../form/date-picker";
import Select from "../form/Select";

const valueOptions = [
  { value: "1M+", label: "€1M+" },
  { value: "<100k", label: "< €100k" },
  { value: "500k-1M", label: "€500k–€1M" },
  { value: "100k-250k", label: "€100k–€250k" },
];

export default function AddProjectModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleSave = () => {
    console.log("Saving new project...");
    onClose();
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
            {/* Informații de bază */}
            <div>
              <h5 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
                Informații de bază
              </h5>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Nume Proiect</Label>
                  <Input type="text" placeholder="Ex: Sediu Nou Coca-Cola" />
                </div>
                <div>
                  <Label>Client</Label>
                  <Input type="text" placeholder="Ex: Coca-Cola HBC" />
                </div>
                <div>
                  <Label>Valoare</Label>
                  <Select
                    options={valueOptions}
                    placeholder="Selectează intervalul"
                    onChange={(val) => console.log("Valoare selectată:", val)}
                  />
                </div>
                <div>
                  <Label>Țară</Label>
                  <Input type="text" placeholder="Ex: Romania" />
                </div>
                <div>
                  <Label>Oraș / Județ</Label>
                  <Input type="text" placeholder="Ex: Cluj-Napoca" />
                </div>
                <div>
                  <Label>Adresă</Label>
                  <Input type="text" placeholder="Ex: Bd. Eroilor 23" />
                </div>
                <div>
                  <DatePicker
                    id="projectStart"
                    label="Start Proiect"
                    placeholder="YYYY-MM-DD"
                  />
                </div>
                <div>
                  <DatePicker
                    id="projectEnd"
                    label="Final Proiect"
                    placeholder="YYYY-MM-DD"
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