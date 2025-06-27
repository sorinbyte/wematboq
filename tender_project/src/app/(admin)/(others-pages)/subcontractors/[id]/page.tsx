"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Subcontractor {
  id: number;
  companyName: string;
  uniqueId: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  addressLine: string;
  city: string;
  state: string;
  country: string;
}

export default function SubcontractorPage() {
  const { id } = useParams();
  const [subcontractor, setSubcontractor] = useState<Subcontractor | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/subcontractors/${id}`);
      const data = await res.json();
      setSubcontractor(data);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!subcontractor) {
    return <div className="p-6 text-gray-700 dark:text-white">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-4 text-gray-700 dark:text-white">
      <h1 className="text-2xl font-bold">{subcontractor.companyName}</h1>
      <p><strong>ID Unic:</strong> {subcontractor.uniqueId}</p>
      <p><strong>Persoană Contact:</strong> {subcontractor.contactFirstName} {subcontractor.contactLastName}</p>
      <p><strong>Email:</strong> {subcontractor.contactEmail}</p>
      <p><strong>Telefon:</strong> {subcontractor.contactPhone}</p>
      <p><strong>Adresă:</strong> {subcontractor.addressLine}, {subcontractor.city}, {subcontractor.state}, {subcontractor.country}</p>

      <Link href="/subcontractors" className="text-blue-600 hover:underline">
        ← Înapoi la listă
      </Link>
    </div>
  );
}
