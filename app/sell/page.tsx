import { Card } from "@/components/ui/card";
import Page from "../components/Page";

import { SellForm } from "./_components/SellForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../lib/db";
import { redirect } from "next/navigation";

/**
 * Check if the user is connected to stripe and redirect to the billing page if not
 *
 * @param userId - The user id
 */
async function checkIsConnectedToStripe(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectLinked: true,
    },
  });

  if (!data?.stripeConnectLinked) {
    redirect("/billing");
  }
}
export default async function SellPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await checkIsConnectedToStripe(user.id);
  return (
    <Page>
      <Card>
        <SellForm />
      </Card>
    </Page>
  );
}
