import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Page from "../components/Page";
import { prisma } from "../lib/db";
import ProductCard from "../components/ProductCard";
import { unstable_noStore } from "next/cache";

async function getData(userId: string) {
  const data = await prisma.product.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      shortDescription: true,
      images: true,
    },
  });

  return data;
}

export default async function MyProductsPage() {
  unstable_noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Not authorized");
  }

  const data = await getData(user.id);
  return (
    <Page>
      <h1 className="text-2xl font-bold">My Products</h1>
      <div className="grid grid-cols-1 gap-10 mt-4 lg:grid-cols-3 sm:grid-cols-2 ">
        {data.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))}
      </div>
    </Page>
  );
}
