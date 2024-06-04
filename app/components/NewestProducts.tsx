import Link from "next/link";
import { prisma } from "../lib/db";
import ProductCard from "./ProductCard";

type Props = {};

async function getData() {
  // fetch products using prisma
  const products = await prisma.product.findMany({
    select: {
      price: true,
      shortDescription: true,
      category: true,
      name: true,
      id: true,
      images: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
}

export async function NewestProducts({}: Props) {
  const data = await getData();
  return (
    <section className="mt-12">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Newest Products
        </h2>
        <Link
          href="/products/categories/all"
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
