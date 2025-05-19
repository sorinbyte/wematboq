import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProiecteTable from "@/components/tables/ProiecteTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Proiecte",
  description:
    "This is the Projects page, showing bids and projects won.",
};

export default function ProiectePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Proiecte" />
      <div className="space-y-6">
        <ComponentCard title="Lista Proiecte">
          <ProiecteTable />
        </ComponentCard>
      </div>
    </div>
  );
}