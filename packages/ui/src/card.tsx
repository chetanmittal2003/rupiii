import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-6 bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105">
      <h1 className="text-xl border-b pb-2 font-semibold">{title}</h1>
      <div>{children}</div>
    </div>
  );
}
