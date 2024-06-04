import Link from "next/link";
import { prisma } from "../lib/db";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";
import { CategoryType } from "@prisma/client";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  title: string;
  category?: CategoryType | "all";
};

async function getData(category?: CategoryType | "all") {
  category = category === "all" ? undefined : category;
  // fetch products using prisma
  const products = await prisma.product.findMany({
    where: {
      category,
    },
    select: {
      price: true,
      shortDescription: true,
      category: true,
      name: true,
      id: true,
      images: true,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}

export function ProductsRow({ title, category }: Props) {
  return (
    <Suspense fallback={<ProductLoadingState />}>
      <ProductContent title={title} category={category} />
    </Suspense>
  );
}

async function ProductContent({ title, category }: Props) {
  const data = await getData(category);
  return (
    <section className="mt-12">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
        <Link
          href={`/products/categories/${category}`}
          className="hidden text-sm font-medium text-primary hover:text-primary/90 md:block"
        >
          All Products <span>&rarr;</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-10 mt-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {data.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}

export function ProductLoadingState() {
  return (
    <div className="mt-8">
      <Skeleton className="w-56 h-8" />
      <div className="grid grid-cols-1 gap-10 mt-4 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
}
