import ComponentCard from "@/components/common/ComponentCard";
import SubantreprenoriTable from "@/components/tables/SubantreprenoriTable";
import AddSubcontractorBlock from "@/components/subcontractors/AddSubcontractorBlock";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subantreprenori",
  description: "This is the Subcontractors page, showing bids and projects won.",
};

export default function SubantreprenoriPage() {
  return (
    <div className="space-y-6">
      <ComponentCard>
        <AddSubcontractorBlock />
        <SubantreprenoriTable />
      </ComponentCard>
    </div>
  );
}