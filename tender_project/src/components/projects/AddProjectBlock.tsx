"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import AddProjectModal from "@/components/projects/AddProjectModal";

export default function AddProjectBlock() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Lista Proiecte</h2>
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <Plus size={18} strokeWidth={3} />
          Adaugă proiect
        </button>
      </div>

      {/* Modal form */}
      <AddProjectModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}