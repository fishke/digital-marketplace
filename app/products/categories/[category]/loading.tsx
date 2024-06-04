import Page from "@/app/components/Page";
import { ProductCardSkeleton } from "@/app/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

export default function Loading({}: Props) {
  return (
    <Page>
      <div className="grid grid-cols-1 gap-10 mt-4 lg:grid-cols-3 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </Page>
  );
}
