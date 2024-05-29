"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
};
export default function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Please Wait...
        </Button>
      ) : (
        <Button type="submit">{children}</Button>
      )}
    </>
  );
}
