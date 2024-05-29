import { cn } from "@/lib/utils";
import React from "react";

interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Page({ children, className, ...rest }: PageProps) {
  return (
    <section
      className={cn("px-4 mx-auto max-w-7xl md:px-8", className)}
      {...rest}
    >
      {children}
    </section>
  );
}
