"use client"
import React, { useState } from "react";
import Pagination from "@/components/tables/Pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Project {
  id: number;
  name: string;
  client: string;
  value: string;
  typesOfWork: string[];
  projectStart: string;
  bidStart: string;
  bidEnd: string;
  status: "Active" | "Canceled" | "In Bidding";
}

const projectData: Project[] = [
  {
    id: 1,
    name: "Deutsche Bank HQ Renovation",
    client: "Deutsche Bank",
    value: "450,000 EUR",
    typesOfWork: ["Electrical Installations", "HVAC"],
    projectStart: "2024-05-01",
    bidStart: "2024-04-01",
    bidEnd: "2024-04-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Tech Park Offices",
    client: "Tech Development Group",
    value: "1.2M EUR",
    typesOfWork: ["Concrete Works", "Interior Finishes"],
    projectStart: "2024-06-15",
    bidStart: "2024-05-10",
    bidEnd: "2024-05-20",
    status: "In Bidding",
  },
  {
    id: 3,
    name: "Green Retail Mall",
    client: "Green Retail Group",
    value: "800,000 EUR",
    typesOfWork: ["Roofing", "Waterproofing", "Security Systems"],
    projectStart: "2024-07-01",
    bidStart: "2024-05-01",
    bidEnd: "2024-05-15",
    status: "Canceled",
  },
  {
    id: 4,
    name: "Airport Terminal Upgrade",
    client: "Bucharest Airport",
    value: "3M EUR",
    typesOfWork: ["HVAC", "Electrical Installations"],
    projectStart: "2024-09-01",
    bidStart: "2024-07-15",
    bidEnd: "2024-08-01",
    status: "In Bidding",
  },
  {
    id: 5,
    name: "National Library Retrofit",
    client: "Ministry of Culture",
    value: "2.2M EUR",
    typesOfWork: ["Interior Finishes", "Plumbing"],
    projectStart: "2024-10-01",
    bidStart: "2024-08-01",
    bidEnd: "2024-08-20",
    status: "Active",
  },
  {
    id: 6,
    name: "Hospital Expansion - Sector 3",
    client: "Health Ministry",
    value: "5M EUR",
    typesOfWork: ["Concrete Works", "HVAC", "Security Systems"],
    projectStart: "2024-11-01",
    bidStart: "2024-09-01",
    bidEnd: "2024-09-20",
    status: "Active",
  },
  {
    id: 7,
    name: "Metro Line M7 Infrastructure",
    client: "Metrorex",
    value: "10M EUR",
    typesOfWork: ["Electrical Installations", "Concrete Works"],
    projectStart: "2025-01-15",
    bidStart: "2024-11-01",
    bidEnd: "2024-11-25",
    status: "In Bidding",
  },
  {
    id: 8,
    name: "Shopping Center Ploiesti",
    client: "Retail Group Romania",
    value: "3.4M EUR",
    typesOfWork: ["Interior Finishes", "Plumbing"],
    projectStart: "2025-02-01",
    bidStart: "2024-12-01",
    bidEnd: "2024-12-20",
    status: "Canceled",
  },
  {
    id: 9,
    name: "New Stadium Lighting",
    client: "City Hall Brasov",
    value: "1.1M EUR",
    typesOfWork: ["Electrical Installations", "Security Systems"],
    projectStart: "2025-03-01",
    bidStart: "2025-01-01",
    bidEnd: "2025-01-15",
    status: "Active",
  },
  {
    id: 10,
    name: "Logistics Hub Timisoara",
    client: "LogiWare",
    value: "6M EUR",
    typesOfWork: ["Roofing", "Concrete Works", "HVAC"],
    projectStart: "2025-04-01",
    bidStart: "2025-02-01",
    bidEnd: "2025-02-15",
    status: "In Bidding",
  },
  {
    id: 11,
    name: "Office Tower North Gate",
    client: "Skytop Holdings",
    value: "7.5M EUR",
    typesOfWork: ["Interior Finishes", "Security Systems"],
    projectStart: "2025-05-01",
    bidStart: "2025-03-01",
    bidEnd: "2025-03-15",
    status: "Active",
  },
  {
    id: 12,
    name: "University Expansion",
    client: "Politehnica Bucuresti",
    value: "2.7M EUR",
    typesOfWork: ["Plumbing", "Electrical Installations"],
    projectStart: "2025-06-01",
    bidStart: "2025-04-01",
    bidEnd: "2025-04-20",
    status: "Canceled",
  },
  {
    id: 13,
    name: "Bridge Maintenance Program",
    client: "Infrastructure Ministry",
    value: "1.8M EUR",
    typesOfWork: ["Concrete Works", "Waterproofing"],
    projectStart: "2025-07-15",
    bidStart: "2025-05-15",
    bidEnd: "2025-06-01",
    status: "Active",
  },
  {
    id: 14,
    name: "High School Modernization",
    client: "Sector 6 Administration",
    value: "900,000 EUR",
    typesOfWork: ["Interior Finishes", "HVAC"],
    projectStart: "2025-08-01",
    bidStart: "2025-06-10",
    bidEnd: "2025-06-25",
    status: "In Bidding",
  },
  {
    id: 15,
    name: "Hotel Renovation - Constanta",
    client: "Seaside Group",
    value: "3M EUR",
    typesOfWork: ["HVAC", "Plumbing", "Interior Finishes"],
    projectStart: "2025-09-01",
    bidStart: "2025-07-01",
    bidEnd: "2025-07-15",
    status: "Canceled",
  },
  {
    id: 16,
    name: "Warehouse Construction",
    client: "eCommerce Solutions",
    value: "1.4M EUR",
    typesOfWork: ["Concrete Works", "Security Systems"],
    projectStart: "2025-10-01",
    bidStart: "2025-08-01",
    bidEnd: "2025-08-20",
    status: "Active",
  },
  {
    id: 17,
    name: "Solar Farm Engineering",
    client: "GreenTech Energy",
    value: "5.5M EUR",
    typesOfWork: ["Electrical Installations", "Plumbing"],
    projectStart: "2025-11-01",
    bidStart: "2025-09-01",
    bidEnd: "2025-09-20",
    status: "Active",
  },
  {
    id: 18,
    name: "Government Office Refurbishment",
    client: "Public Works Romania",
    value: "2.3M EUR",
    typesOfWork: ["Interior Finishes", "HVAC"],
    projectStart: "2025-12-01",
    bidStart: "2025-10-01",
    bidEnd: "2025-10-15",
    status: "In Bidding",
  },
  {
    id: 19,
    name: "Railway Station Overhaul",
    client: "CFR SA",
    value: "4M EUR",
    typesOfWork: ["Concrete Works", "Plumbing", "Security Systems"],
    projectStart: "2026-01-01",
    bidStart: "2025-11-01",
    bidEnd: "2025-11-20",
    status: "Canceled",
  },
  {
    id: 20,
    name: "City Park Development",
    client: "Sector 2 Local Authority",
    value: "2M EUR",
    typesOfWork: ["Landscaping", "Lighting", "Security Systems"],
    projectStart: "2026-02-01",
    bidStart: "2025-12-01",
    bidEnd: "2025-12-15",
    status: "Active",
  },
];

export default function ProiecteTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(projectData.length / rowsPerPage);

  const paginatedData = projectData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* ... table header ... */}

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginatedData.map((project) => (
                <TableRow key={project.id}>
                    <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">
                        {project.name}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {project.client}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                        {project.value}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                        {project.typesOfWork.join(", ")}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                        {project.projectStart}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                        {project.bidStart}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                        {project.bidEnd}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-center">
                        <Badge
                        size="sm"
                        color={
                            project.status === "Active"
                            ? "success"
                            : project.status === "In Bidding"
                            ? "warning"
                            : "error"
                        }
                        >
                        {project.status}
                        </Badge>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination component */}
      <div className="flex justify-end px-6 py-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}