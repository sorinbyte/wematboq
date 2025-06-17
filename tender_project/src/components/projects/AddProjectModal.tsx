"use client";
import React from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { Upload, FilePlus } from "lucide-react"; // ✅ Icons

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
                  <Label>Status</Label>
                  <Input
                    type="text"
                    placeholder="În desfășurare / Câștigat / Pierdut"
                  />
                </div>
                <div>
                  <Label>Client</Label>
                  <Input type="text" placeholder="Ex: Coca-Cola HBC" />
                </div>
                <div>
                  <Label>Valoare</Label>
                  <Input type="number" placeholder="Ex: 500000" />
                </div>
                <div className="lg:col-span-2">
                  <Label>Tipuri de Lucrări</Label>
                  <Input
                    type="text"
                    placeholder="Ex: Fit-out, HVAC, Sanitare"
                  />
                </div>
                <div>
                  <Label>Start Proiect</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Start Licitație</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Final Licitație</Label>
                  <Input type="date" />
                </div>
              </div>
            </div>

            {/* Documente proiect */}
            <div>
              <h5 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
                Documente proiect
              </h5>
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="justify-start gap-2">
                  <Upload size={18} />
                  Importă BOQ
                </Button>
                <label className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer text-sm text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-white/[0.05]">
                  <FilePlus size={18} />
                  Adaugă fișiere proiect
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        console.log("Fișiere selectate:", files);
                        // You can store the files in state here if needed
                      }
                    }}
                  />
                </label>
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