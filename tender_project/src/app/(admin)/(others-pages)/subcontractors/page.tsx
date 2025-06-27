import ComponentCard from "@/components/common/ComponentCard";
import SubantreprenoriTable from "@/components/tables/SubantreprenoriTable";
import AddSubcontractorBlock from "@/components/subcontractors/AddSubcontractorBlock";
import { Metadata } from "next";



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