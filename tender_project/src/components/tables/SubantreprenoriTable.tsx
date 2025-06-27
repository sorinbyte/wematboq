"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { workCategories, workCategoryStyles } from "@/lib/data";

interface Subcontractor {
  id: number;
  companyName: string;
  specialties: {
    id: number; // 👈 add this
    workCategory: {
      code: string;
      label: string;
    };
  }[];
  contactFirstName: string;
  contactLastName: string;
  contactPhone: string;
  contactEmail: string;
}

export default function SubantreprenoriTable() {
  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/subcontractors");
      const data = await res.json();
      setSubcontractors(data);
    };
    fetchData();
  }, []);

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
                <TableCell className="px-5 py-3 text-sm font-semibold text-gray-700 dark:text-white uppercase tracking-wide text-start">
                  Persoană de Contact
                </TableCell>
                <TableCell className="px-5 py-3 text-sm font-semibold text-gray-700 dark:text-white uppercase tracking-wide text-start">
                  Telefon
                </TableCell>
                <TableCell className="px-5 py-3 text-sm font-semibold text-gray-700 dark:text-white uppercase tracking-wide text-start">
                  Email
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {subcontractors.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-800 dark:text-white/90">
                    <Link
                      href={`/subcontractors/${sub.id}`}
                      className="hover:underline hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {sub.companyName}
                    </Link>
                  </TableCell>

                  <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                    <div>
                      {(() => {
                        const chunks = [];
                        for (let i = 0; i < sub.specialties.length; i += 3) {
                          chunks.push(sub.specialties.slice(i, i + 3));
                        }

                        return chunks.map((chunk, idx) => (
                          <div key={idx} className="flex flex-wrap gap-2 mb-1">
                            {chunk.map((item) => {
                              const code = item.workCategory?.code;
                              
                              const styles = workCategoryStyles[code] || {
                                bg: "bg-gray-500",
                                border: "border-gray-700",
                              };

                              const label =
                                workCategories.find((cat) => cat.value === code)?.label ??
                                item.workCategory?.label ??
                                code;
                              return (
                                <span
                                  key={item.id}
                                  className={`text-white text-sm px-2 py-1 rounded-full ${styles.bg}`}
                                >
                                  {label}
                                </span>
                              );
                            })}
                          </div>
                        ));
                      })()}
                    </div>
                  </TableCell>

                  <TableCell className="px-5 py-4 text-start text-base text-gray-500 dark:text-gray-400">
                    {sub.contactFirstName} {sub.contactLastName}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-base text-gray-500 dark:text-gray-400">
                    {sub.contactPhone}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-base text-gray-500 dark:text-gray-400">
                    {sub.contactEmail}
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