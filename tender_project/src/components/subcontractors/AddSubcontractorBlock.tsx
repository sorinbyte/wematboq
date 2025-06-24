"use client";

import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import PhoneInput from "@/components/form/group-input/PhoneInput";
import MultiSelect from "@/components/form/MultiSelect";
import { Plus } from "lucide-react";
import { workCategories } from "@/lib/data";

export default function AddSubcontractorBlock() {
  const { isOpen, openModal, closeModal } = useModal();

  const handleSave = () => {
    console.log("Subcontractor added");
    closeModal();
  };

  const multiOptions = workCategories.map((cat: { value: string; label: string }) => ({
  value: cat.value,
  text: cat.label,
  selected: false,
}));

  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
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
          <form className="flex flex-col gap-8">
            {/* Informații Personale */}
            <div>
              <h5 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Informații personale</h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Nume</Label>
                  <Input type="text" placeholder="Prenume" />
                </div>
                <div>
                  <Label>Prenume</Label>
                  <Input type="text" placeholder="Nume" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="exemplu@email.com" />
                </div>
                <div>
                  <Label>Telefon</Label>
                  <PhoneInput
                    selectPosition="start"
                    countries={[{ code: "RO", label: "+40" }]}
                    placeholder="+40 712 345 678"
                    onChange={handlePhoneNumberChange}
                  />
                </div>
              </div>
            </div>

            {/* Informații Companie */}
            <div>
              <h5 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Informații companie</h5>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Nume companie</Label>
                  <Input type="text" placeholder="Ex: SC Instalatii SRL" />
                </div>
                <div>
                  <Label>ID Unic</Label>
                  <Input type="text" placeholder="CUI / CIF / ID fiscal" />
                </div>
                <div>
                  <Label>Țară</Label>
                  <Input type="text" placeholder="România" />
                </div>
                <div>
                  <Label>Oraș / Județ</Label>
                  <Input type="text" placeholder="București / Ilfov" />
                </div>
                <div className="lg:col-span-2">
                  <Label>Adresă completă</Label>
                  <Input type="text" placeholder="Str. Exemplu nr. 1, et. 2, ap. 4" />
                </div>
              </div>
            </div>

            {/* Categorii lucrări */}
            <div>
              <h5 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Categorii lucrări</h5>
              <MultiSelect
                label="Selectează una sau mai multe categorii"
                options={multiOptions}
                defaultSelected={[]}
                onChange={(values) => console.log("Selected work types:", values)}
              />
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