"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import { prisma } from "./lib/db";
import type { CategoryType } from "@prisma/client";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

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

const userSettingsSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Minimum of 3 chars are required" })
    .or(z.literal(""))
    .optional(),
  lastName: z
    .string()
    .min(3, { message: "Minimum of 3 chars are required" })
    .or(z.literal(""))
    .optional(),
});

async function checkUserExists() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("You must be logged in to sell a product");
  }

  return user;
}

function handleError(validateFields: any) {
  const state: State = {
    status: "error",
    errors: validateFields.error.flatten().fieldErrors,
    message: "Something went wrong",
  };

  return state;
}

export async function sellProduct(prevState: any, formData: FormData) {
  const user = await checkUserExists();

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
    return handleError(validateFields);
  }

  const {
    name,
    category,
    price,
    shortDescription,
    description,
    images,
    productFile,
  } = validateFields.data;
  const data = await prisma.product.create({
    data: {
      name,
      price,
      shortDescription,
      description: JSON.parse(description),
      images,
      productFile,
      category: category as CategoryType,
      userId: user.id,
    },
  });
  const state: State = {
    status: "success",
    message: "Product has been successfully created",
  };

  return redirect(`/product/${data.id}`);
}

export async function updateSettings(prevState: any, formData: FormData) {
  const user = await checkUserExists();

  const validateFields = userSettingsSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!validateFields.success) {
    return handleError(validateFields);
  }

  const data = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: validateFields.data.firstName,
      lastName: validateFields.data.lastName,
    },
  });

  const state: State = {
    status: "success",
    message: "Settings have been successfully updated",
  };

  return state;
}

export async function buyProduct(formData: FormData) {
  const id = formData.get("id") as string;
  const data = await prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      price: true,
      shortDescription: true,
      name: true,
      images: true,
      User: {
        select: {
          connectedAccountId: true,
        },
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round((data?.price as number) * 100),
          product_data: {
            name: data?.name as string,
            description: data?.shortDescription,
            images: data?.images,
          },
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: Math.round((data?.price as number) * 100) * 0.1,
      transfer_data: {
        destination: data?.User?.connectedAccountId as string,
      },
    },
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancel",
  });

  return redirect(session.url as string);
}

export async function linkStripeAccount() {
  const user = await checkUserExists();

  // get user from prisma
  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  const accountLink = await stripe.accountLinks.create({
    account: userData?.connectedAccountId as string,
    refresh_url: "http://localhost:3000/billing",
    return_url: `http://localhost:3000/return/${userData?.connectedAccountId}`,
    type: "account_onboarding",
  });

  return redirect(accountLink.url);
}

export async function goToStripeDashboard() {
  const user = await checkUserExists();

  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      connectedAccountId: true,
    },
  });

  const loginLink = await stripe.accounts.createLoginLink(
    userData?.connectedAccountId as string
  );
  redirect(loginLink.url);
}
