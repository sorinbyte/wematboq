import ComponentCard from "@/components/common/ComponentCard";
import AddProjectBlock from "@/components/projects/AddProjectBlock";
import { Metadata } from "next";
import { ProjectsTable } from "@/components/tables/ProjectsTable";

export const metadata: Metadata = {
  title: "Proiecte",
  description: "This is the Projects page, showing bids and projects won.",
};

export default function ProiectePage() {
  return (
    <div className="space-y-6">
      <ComponentCard>
        <AddProjectBlock />
        <ProjectsTable />
      </ComponentCard>
    </div>
  );
}