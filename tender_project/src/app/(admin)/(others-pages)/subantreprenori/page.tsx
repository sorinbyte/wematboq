import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SubantreprenoriTable from "@/components/tables/SubantreprenoriTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Subantreprenori",
  description:
    "This is the Subcontractors page, showing bids and projects won.",
};

export default function SubantreprenoriPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Subantreprenori" />
      <div className="space-y-6">
        <ComponentCard title="Lista Subantreprenori">
          <SubantreprenoriTable />
        </ComponentCard>
      </div>
    </div>
  );
}