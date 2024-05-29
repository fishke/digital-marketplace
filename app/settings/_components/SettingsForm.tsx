"use client";

import { State, updateSettings } from "@/app/actions";
import FieldSet from "@/app/components/FieldSet";
import SubmitButton from "@/app/components/SubmitButton";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

type SettingsFormProps = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function SettingsForm({
  firstName,
  lastName,
  email,
}: SettingsFormProps) {
  const initialState: State = {
    message: "",
    status: undefined,
  };
  const [state, formAction] = useFormState(updateSettings, initialState);

  useEffect(() => {
    const { status, message } = state;

    switch (status) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        break;
    }
  }, [state]);

  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Update your account settings.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <FieldSet label="First Name">
          <Input name="firstName" defaultValue={firstName} />
        </FieldSet>
        <FieldSet label="Last Name">
          <Input name="lastName" defaultValue={lastName} />
        </FieldSet>
        <FieldSet label="Email">
          <Input name="email" type="email" disabled defaultValue={email} />
        </FieldSet>
      </CardContent>
      <CardFooter>
        <SubmitButton>Update Settings</SubmitButton>
      </CardFooter>
    </form>
  );
}
