"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { projectsData } from "@/lib/data";
import { notFound } from "next/navigation";
import ProjectOverview from "@/components/projects/ProjectOverview";
import BoqImportSection from "@/components/projects/BoqImportSection";
import BoqViewer from "@/components/projects/BoqViewer";
import CreatePackageForm from "@/components/projects/CreatePackageForm"; // You'll create this next

interface Props {
  params: { id: string };
}

interface BoqSheet {
  sheetName: string;
  headers: string[];
  rows: any[];
}

export default function ProjectPage({ params }: Props) {
  const project = projectsData.find((p) => p.id.toString() === params.id);

  if (!project) return notFound();

  const [boqData, setBoqData] = useState<BoqSheet[] | null>(null);
  const [boqStatus, setBoqStatus] = useState<"idle" | "previewing" | "accepted">("idle");
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [packageMeta, setPackageMeta] = useState<{ name: string; description: string } | null>(null);
  const router = useRouter();

  return (
    <div className="p-6 space-y-6">
      <ProjectOverview project={project} />

      {boqStatus === "accepted" && !showPackageForm && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowPackageForm(true)}
            className="px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600"
          >
            + Creează Pachet
          </button>
        </div>
      )}

      {showPackageForm && (
        <CreatePackageForm
          boqData={boqData!}
          onClose={() => setShowPackageForm(false)}
          onSave={(meta) => {
            setPackageMeta(meta); // Save the package metadata
            setShowPackageForm(false); // Close the form

            // Navigate to the new package page
            router.push(`/projects/${params.id}/packages/new`);
          }}
      />
      )}

      <BoqImportSection
        boqData={boqData}
        setBoqData={setBoqData}
        boqStatus={boqStatus}
        setBoqStatus={setBoqStatus}
      />
    </div>
  );
}