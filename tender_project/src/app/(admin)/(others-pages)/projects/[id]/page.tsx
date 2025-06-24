import { projectsData } from "@/lib/data";
import { notFound } from "next/navigation";
import ProjectOverview from "@/components/projects/ProjectOverview";
import BoqImportSection from "@/components/projects/BoqImportSection";

interface Props {
  params: { id: string };
}

export default function ProjectPage({ params }: Props) {
  const project = projectsData.find((p) => p.id.toString() === params.id);

  if (!project) return notFound();

  return (
    <div className="p-6 space-y-6">
      <ProjectOverview project={project} />
      <BoqImportSection />
    </div>
  );
}