import React from "react";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="manager-layout">
      {/* Tu peux ajouter une sidebar, un header spécifique ici si besoin */}
      {children}
    </div>
  );
}
