import React from "react";

interface Props {
  project: {
    projectname: string;
    client: string;
    projectvalue: string;
    addressLine?: string;
    city?: string;
    country?: string;
    projectstart?: string;
    projectend?: string;
  };
}

export default function ProjectOverview({ project }: Props) {
  const {
    projectname,
    client,
    projectvalue,
    addressLine,
    city,
    country,
    projectstart,
    projectend,
  } = project;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 space-y-4 text-sm text-gray-700 dark:text-white/90">
      {/* Title and Value */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{projectname}</h3>
        <span className="text-xl font-semibold text-gray-600 dark:text-white/80">
          {projectvalue}
        </span>
      </div>

      {/* Client */}
      <p><strong>Client:</strong> {client}</p>

      {/* Country, City, Address */}
      <div className="flex flex-col sm:flex-row sm:gap-x-8">
        <p className="text-base"><strong>Țară:</strong> {country ?? ""}</p>
        <p className="text-base"><strong>Oraș:</strong> {city ?? ""}</p>
        <p><strong>Adresă:</strong> {addressLine ?? ""}</p>
      </div>

      {/* Start and Final Dates */}
      <div className="flex justify-between flex-col sm:flex-row sm:gap-x-8">
        <p className="text-xl"><strong>Start:</strong> {projectstart}</p>
        <p className="text-xl"><strong>Final:</strong> {projectend}</p>
      </div>
    </div>
  );
}