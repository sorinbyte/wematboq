"use client";

import React from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Plus } from "lucide-react";

export default function AddSubcontractorBlock() {
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = () => {
    console.log("Subcontractor added");
    closeModal();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Lista Subantreprenori
        </h2>
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <Plus size={18} strokeWidth={3} />
          Adaugă subantreprenor
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="w-full p-6 overflow-y-auto bg-white rounded-3xl dark:bg-gray-900">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
            Adaugă Subantreprenor
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Completează datele subcontractorului.
          </p>
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>Nume</Label>
                <Input type="text" placeholder="Nume firmă" />
              </div>
              <div>
                <Label>Persoană de contact</Label>
                <Input type="text" placeholder="Nume complet" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="exemplu@email.com" />
              </div>
              <div>
                <Label>Telefon</Label>
                <Input type="text" placeholder="07xxxxxxxx" />
              </div>
              <div className="lg:col-span-2">
                <Label>Tipuri de lucrări</Label>
                <Input type="text" placeholder="ex: HVAC, Finisaje, Electricitate" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Renunță
              </Button>
              <Button size="sm" onClick={handleSave}>
                Salvează
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}