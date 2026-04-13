import React from "react";

interface DetailRowProps {
  label: string;
  value: string;
}

export const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => {
  return (
    <div className="detail-row">
      <dt className="detail-row__term">{label}</dt>
      <dd className="detail-row__definition">{value}</dd>
    </div>
  );
};
