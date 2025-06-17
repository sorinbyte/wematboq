import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Subcontractor {
  id: number;
  name: string;
  specialties: string[];
  bids: number;
  wins: number;
}

const tableData: Subcontractor[] = [
  {
    id: 1,
    name: "SC ElectroInstal SRL",
    specialties: ["Electrical Installations", "Security Systems"],
    bids: 12,
    wins: 4,
  },
  {
    id: 2,
    name: "Construct Alpha",
    specialties: ["Concrete Works"],
    bids: 8,
    wins: 3,
  },
  {
    id: 3,
    name: "Delta HVAC Solutions",
    specialties: ["HVAC", "Plumbing"],
    bids: 15,
    wins: 7,
  },
  {
    id: 4,
    name: "GreenRoof Systems",
    specialties: ["Roofing", "Waterproofing"],
    bids: 6,
    wins: 2,
  },
  {
    id: 5,
    name: "FinishPro Interiors",
    specialties: ["Interior Finishes", "Gypsum Boards", "Painting"],
    bids: 10,
    wins: 5,
  },
];

export default function SubantreprenoriTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-800">
                <TableCell className="px-5 py-3 text-sm font-semibold text-gray-700 dark:text-white uppercase tracking-wide text-start">
                  Nume Subantreprenor
                </TableCell>
                <TableCell className="px-5 py-3 text-sm font-semibold text-gray-700 dark:text-white uppercase tracking-wide text-start">
                  Specialități
                </TableCell>
                <TableCell className="px-5 py-3 text-sm font-semibold text-gray-700 dark:text-white uppercase tracking-wide text-center">
                  Proiecte ofertate
                </TableCell>
                <TableCell className="px-5 py-3 text-sm font-semibold text-gray-700 dark:text-white uppercase tracking-wide text-center">
                  Proiecte câștigate
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">
                    {sub.name}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    {sub.specialties.join(", ")}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    {sub.bids}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    {sub.wins}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}