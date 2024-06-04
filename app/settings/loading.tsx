import { Card, CardHeader } from "@/components/ui/card";
import Page from "../components/Page";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Page>
      <Card>
        <CardHeader className="h-[500px]">
          <Skeleton className="w-full h-full" />
        </CardHeader>
      </Card>
    </Page>
  );
}
