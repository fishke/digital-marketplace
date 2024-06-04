import Page from "@/app/components/Page";
import { prisma } from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useParams } from "next/navigation";
import ProductLabel from "./_components/ProductLabel";
import ProductValue from "./_components/ProductValue";
import { Separator } from "@/components/ui/separator";
import ProductDescription from "@/app/components/ProductDescription";
import { JSONContent } from "@tiptap/react";

type Props = {};

async function getData(id: string) {
  const data = await prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      category: true,
      description: true,
      shortDescription: true,
      name: true,
      images: true,
      price: true,
      createdAt: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });

  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  // use Intl to format date to locale
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(data?.createdAt);

  return (
    <Page className="lg:grid lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 lg:grid-cols-7 xl:gap-x-16">
      <Carousel className="lg:row-end-1 lg:col-span-4">
        <CarouselContent>
          {data?.images.map((image, idx) => (
            <CarouselItem key={idx}>
              <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                <Image
                  src={image}
                  alt="Product Image"
                  fill
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:col-span-3 lg:row-span-2">
        <h1 className="text-2x font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {data?.name}
        </h1>
        <p className="mt-2 text-muted-foreground">{data?.shortDescription}</p>
        <Button className="w-full mt-10" size="lg">
          Buy for ${data?.price}
        </Button>
        <Separator className="my-10" />

        <div className="grid grid-cols-2 w-full gap-y-3">
          <ProductLabel>Released:</ProductLabel>
          <ProductValue>{formattedDate}</ProductValue>
          <ProductLabel>Category:</ProductLabel>
          <ProductValue>{data?.category}</ProductValue>
        </div>

        <Separator className="my-10" />
      </div>

      <div className="w-full max-w-2xl m-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
        <ProductDescription content={data?.description as JSONContent} />
      </div>
    </Page>
  );
}
