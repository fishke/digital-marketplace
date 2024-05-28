import React from "react";

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
  return (
    <section className="px-4 mx-auto max-w-7xl md:px-8">{children}</section>
  );
}
