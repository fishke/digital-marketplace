import { Card, CardHeader } from "@/components/ui/card";
import Page from "../components/Page";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

export default function Loading({}: Props) {
  return (
    <Page>
      <Card>
        <CardHeader className="h-[1000px]">
          <Skeleton className="w-full h-full" />
        </CardHeader>
      </Card>
    </Page>
  );
}
