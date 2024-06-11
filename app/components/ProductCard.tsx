import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  images: string[];
  name: string;
  price: number;
  shortDescription: string;
  id: string;
};

export default function ProductCard({
  images,
  name,
  price,
  id,
  shortDescription,
}: ProductCardProps) {
  return (
    <div className="flex flex-col rounded-lg shadow-sm ">
      <Carousel>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-60">
                <Image
                  src={image}
                  fill
                  alt="Product Image"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>
      <div className="flex items-center justify-between mt-2">
        <h1 className="text-xl font-semibold">{name}</h1>
        <h3 className="inline-flex items-center px-2 pt-1 text-xs font-medium rounded-md bg-primary/10 text-primary ring-1 ring-inset ring-primary/10">
          ${price}
        </h3>
      </div>
      <p className="h-10 mt-2 text-sm text-muted-foreground text-balance line-clamp-2">
        {shortDescription}
      </p>
      <Button asChild className="w-full mt-5">
        <Link href={`/products/${id}`}>Learn More</Link>
      </Button>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-60" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
      </div>
      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}
