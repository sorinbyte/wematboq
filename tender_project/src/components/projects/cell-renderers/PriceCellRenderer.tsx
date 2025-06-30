import React from "react";

export const PriceCellRenderer = ({ value }: { value: number }) => {
  if (value === null || value === undefined || isNaN(value)) {
    return "-";
  }

  const formatted = value
    .toFixed(2)
    .replace(".", ",") // decimal comma
    .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // thousand dot separator

  return <span>{formatted} €</span>;
};