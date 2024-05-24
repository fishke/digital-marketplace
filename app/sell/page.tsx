import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SelectCategory from "../components/SelectCategory";
import FieldSet from "../components/FieldSet";
import { Textarea } from "@/components/ui/textarea";
import { TitapEditor } from "../components/TiptapEditor";
import { UploadDropzone } from "../lib/uploadThing";
import { Button } from "@/components/ui/button";

export default function SellPage() {
  return (
    <section className="px-4 mx-auto max-w-7xl md:px-8">
      <Card>
        <form>
          <CardHeader>
            <CardTitle>Sell your products</CardTitle>
            <CardDescription>Describe your product in details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-10">
            <FieldSet label="Name">
              <Input type="text" placeholder="Name of your product" />
            </FieldSet>
            <FieldSet label="Category">
              <SelectCategory />
            </FieldSet>
            <FieldSet label="Price">
              <Input type="number" placeholder="29$" />
            </FieldSet>
            <FieldSet label="Product short description">
              <Textarea placeholder="Please describe your product shortly..." />
            </FieldSet>
            <FieldSet label="Description">
              <TitapEditor />
            </FieldSet>
            <FieldSet label="Product Images">
              <UploadDropzone endpoint="imageUploader" />
            </FieldSet>
            <FieldSet label="Product File">
              <UploadDropzone endpoint="productFileUpload" />
            </FieldSet>
          </CardContent>
          <CardFooter className="mt-5">
            <Button type="submit">Submit Form</Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
