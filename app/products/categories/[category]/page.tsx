import Page from "@/app/components/Page";
import ProductCard from "@/app/components/ProductCard";
import { prisma } from "@/app/lib/db";
import { CategoryType } from "@prisma/client";
import { unstable_noStore } from "next/cache";

type CategoryPageProps = {
  params: {
    category: string;
  };
};

async function getData(category: string | undefined) {
  category = category === "all" ? undefined : category;
  //get all products by category using prisma
  const products = await prisma.product.findMany({
    where: {
      category: category as CategoryType,
    },
    select: {
      id: true,
      name: true,
      price: true,
      shortDescription: true,
      images: true,
    },
  });
  return products;
}
export default async function CategoryPage({
  params: { category },
}: CategoryPageProps) {
  unstable_noStore();
  const products = await getData(category);
  return (
    <Page>
      <div className="grid grid-cols-1 gap-10 mt-4 lg:grid-cols-3 sm:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </Page>
  );
}
