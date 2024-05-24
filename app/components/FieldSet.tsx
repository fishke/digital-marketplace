import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

type FieldSetProps = {
  children: ReactNode;
  label: string;
};

export default function FieldSet({ label, children }: FieldSetProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
