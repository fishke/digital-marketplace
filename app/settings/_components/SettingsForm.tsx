"use client";

import FieldSet from "@/app/components/FieldSet";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type SettingsFormProps = {};

export default function SettingsForm({}: SettingsFormProps) {
  return (
    <form>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Update your account settings.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <FieldSet label="First Name">
          <Input id="firstName" name="firstName" />
        </FieldSet>
      </CardContent>
    </form>
  );
}
