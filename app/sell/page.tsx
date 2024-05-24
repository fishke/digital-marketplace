import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectCategory from "../components/SelectCategory";
import FieldSet from "../components/FieldSet";
import { Textarea } from "@/components/ui/textarea";
import { TitapEditor } from "../components/TiptapEditor";

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
          </CardContent>
        </form>
      </Card>
    </section>
  );
}
