import { subcontractorsData } from "@/lib/data";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

export default function SubcontractorPage({ params }: Props) {
  const subcontractor = subcontractorsData.find(
    (sub) => sub.id.toString() === params.id
  );

  if (!subcontractor) return notFound();

  const { companyName, uniqueId, specialties, contact } = subcontractor;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{companyName}</h1>

      <div className="mb-4">
        <p className="text-gray-700">
          <strong>CUI Firmă:</strong> {uniqueId}
        </p>
        <p className="text-gray-700">
          <strong>Specialități:</strong> {specialties.join(", ")}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Persoană de Contact</h2>
        <p className="text-gray-700">
          <strong>Nume:</strong> {contact.firstName} {contact.lastName}
        </p>
        <p className="text-gray-700">
          <strong>Email:</strong> {contact.email}
        </p>
        <p className="text-gray-700">
          <strong>Telefon:</strong> {contact.phone}
        </p>
      </div>
    </div>
  );
}