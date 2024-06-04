import Page from "@/app/components/Page";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

export default function Loading({}: Props) {
  return (
    <Page className="mt-10">
      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
        <div className="col-span-1">
          <Skeleton className="w-full h-64 lg:h-96" />
          <Skeleton className="w-full h-[500px] mt-10" />
        </div>
        <div className="col-span-1">
          <Skeleton className="w-full h-96" />
        </div>
      </div>
    </Page>
  );
}
