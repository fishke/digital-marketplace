"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

const productSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.number().min(1, { message: "Price must be at least 1" }),
  shortDescription: z.string().min(10, {
    message: "Short description must be at least 10 characters long",
  }),
  description: z.string().min(10, { message: "Description is required" }),
  images: z.array(z.string(), { message: "Images are required" }),
  productFile: z
    .string()
    .min(1, { message: "Please upload a zip of your product" }),
});

export async function sellProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("You must be logged in to sell a product");
  }

  const validateFields = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    shortDescription: formData.get("shortDescription"),
    description: formData.get("description"),
    images: JSON.parse(formData.get("images") as string),
    productFile: formData.get("productFile"),
  });

  // validate that values are correct
  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Something went wrong",
    };

    return state;
  }

  const state: State = {
    status: "success",
    message: "Product has been successfully created",
  };

  return state;
}
