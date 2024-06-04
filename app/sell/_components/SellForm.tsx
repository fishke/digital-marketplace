"use client";
import { State, sellProduct } from "@/app/actions";
import ErrorMessage from "@/app/components/ErrorMessage";
import FieldSet from "@/app/components/FieldSet";
import SelectCategory from "@/app/components/SelectCategory";
import SubmitButton from "@/app/components/SubmitButton";
import TitapEditor from "@/app/components/TiptapEditor";
import { UploadDropzone } from "@/app/lib/uploadThing";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { JSONContent } from "@tiptap/react";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import { toast } from "sonner";

type Props = {};

export function SellForm({}: Props) {
  const initialState: State = {
    status: undefined,
    message: "",
  };
  const [state, formAction] = useFormState(sellProduct, initialState);
  const [json, setJson] = useState<JSONContent | null>(null);
  const [images, setImages] = useState<string[] | null>(null);
  const [productFile, setProductFile] = useState<string | null>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message ?? "Product has been successfully added");
      redirect("/");
    } else if (state.status === "error") {
      toast.error(state.message ?? "Something went wrong");
    }
  }, [state]);

  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Sell your products</CardTitle>
        <CardDescription>Describe your product in details</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-10">
        <FieldSet label="Name">
          <Input name="name" type="text" placeholder="Name of your product" />
          <ErrorMessage name="name" state={state} />
        </FieldSet>
        <FieldSet label="Category">
          <SelectCategory />
          <ErrorMessage name="category" state={state} />
        </FieldSet>
        <FieldSet label="Price">
          <Input type="number" placeholder="29$" name="price" />
          <ErrorMessage name="price" state={state} />
        </FieldSet>
        <FieldSet label="Product short description">
          <Textarea
            placeholder="Please describe your product shortly..."
            name="shortDescription"
          />
          <ErrorMessage name="shortDescription" state={state} />
        </FieldSet>
        <FieldSet label="Description">
          <input
            type="hidden"
            name="description"
            value={JSON.stringify(json) || ""}
          />
          <TitapEditor json={json} setJson={setJson} />
          <ErrorMessage name="description" state={state} />
        </FieldSet>
        <FieldSet label="Product Images">
          <input
            type="hidden"
            name="images"
            value={JSON.stringify(images) || ""}
          />
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImages(res.map((r) => r.url));
              toast.success("Images uploaded successfully");
            }}
            onUploadError={(err) => {
              toast.error("Images upload failed");
              console.error(err);
            }}
          />
          <ErrorMessage name="images" state={state} />
        </FieldSet>
        <FieldSet label="Product File">
          <input type="hidden" name="productFile" value={productFile || ""} />
          <UploadDropzone
            endpoint="productFileUpload"
            onClientUploadComplete={(res) => {
              setProductFile(res[0].url);
              toast.success("Product file uploaded successfully");
            }}
            onUploadError={(err) => {
              console.error(err);
              toast.error("Product file upload failed");
            }}
          />
          <ErrorMessage name="productFile" state={state} />
        </FieldSet>
      </CardContent>
      <CardFooter className="mt-5">
        <SubmitButton>Create Product</SubmitButton>
      </CardFooter>
    </form>
  );
}
