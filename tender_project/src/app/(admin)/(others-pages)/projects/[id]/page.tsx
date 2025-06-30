"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";

import ProjectOverview from "@/components/projects/ProjectOverview";
import BoqImportSection from "@/components/projects/BoqImportSection";
import CreatePackageForm from "@/components/projects/CreatePackageForm";

interface Props {
  params: Promise<{ id: string }>;
}

interface Project {
  id: number;
  projectname: string;
  client: string;
  projectvalue: string;
  address?: {
    addressLine?: string;
    city?: string;
    country?: string;
  };
  projectstart?: string;
  projectend?: string;
}

interface BoqSheet {
  sheetName: string;
  headers: string[];
  rows: any[];
}

export default function ProjectPage(props: Props) {
  const router = useRouter();
  const [projectId, setProjectId] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const [boqData, setBoqData] = useState<BoqSheet[] | null>(null);
  const [boqStatus, setBoqStatus] = useState<"idle" | "previewing" | "accepted">("idle");
  const [boqLoading, setBoqLoading] = useState(true);
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [packageMeta, setPackageMeta] = useState<{ name: string; description: string } | null>(null);

  // Get project ID from params
  useEffect(() => {
    props.params.then((resolvedParams) => {
      setProjectId(resolvedParams.id);
    });
  }, [props.params]);

  // Fetch project data
  useEffect(() => {
    if (!projectId) return;

    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        if (!res.ok) return setProject(null);
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error("Error fetching project:", err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  useEffect(() => {
  if (!projectId) return;

  async function fetchBoq() {
    setBoqLoading(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/boq`);
      const data = await res.json();
      setBoqData(data.boqSheets || null);
      setBoqStatus(data.boqSheets ? "accepted" : "idle");
    } catch (err) {
      console.error("Error fetching BOQ:", err);
    } finally {
      setBoqLoading(false);
    }
  }

  fetchBoq();
}, [projectId]);

  // Fetch existing BOQ if available
  useEffect(() => {
    if (!projectId) return;

    async function fetchBoq() {
      try {
        const res = await fetch(`/api/projects/${projectId}/boq`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.boqSheets) {
          setBoqData(data.boqSheets);
          setBoqStatus("accepted");
        }
      } catch (err) {
        console.error("Error fetching BOQ:", err);
      }
    }

    fetchBoq();
  }, [projectId]);

  if (loading) return <div>Se încarcă...</div>;
  if (!project) return notFound();

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
            setPackageMeta(meta);
            setShowPackageForm(false);
            router.push(`/projects/${projectId}/packages/new`);
          }}
        />
      )}

      {!boqLoading && (
        <BoqImportSection
          projectId={Number(projectId)}
          boqData={boqData}
          setBoqData={setBoqData}
          boqStatus={boqStatus}
          setBoqStatus={setBoqStatus}
          uploadedById={3} // replace with real user
        />
      )}
    </div>
  );
}