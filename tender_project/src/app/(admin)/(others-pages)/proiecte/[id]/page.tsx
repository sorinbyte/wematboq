
import { getData } from "@/lib/data"; // Adjust path if needed
import { notFound } from "next/navigation";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getData().find(p => p.id === params.id);

  if (!project) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{project.projectname}</h1>
      <p><strong>Client:</strong> {project.client}</p>
      <p><strong>Status:</strong> {project.status}</p>
      <p><strong>Start:</strong> {project.projectstart}</p>
      {/* Add more fields or tab navigation here */}
    </div>
  );
}