import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Page from "../components/Page";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../lib/db";
import { Button } from "@/components/ui/button";
import { goToStripeDashboard, linkStripeAccount } from "../actions";
import SubmitButton from "../components/SubmitButton";

async function getData(userId: string) {
  // get user from prisma
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectLinked: true,
    },
  });

  return user;
}

export default async function BillingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    throw new Error("Unauthorized");
  }

  const data = await getData(user.id);

  return (
    <Page>
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>Find all your payment details here</CardDescription>
        </CardHeader>
        <CardContent>
          {data?.stripeConnectLinked ? (
            <form action={goToStripeDashboard}>
              <SubmitButton>View Dashboard</SubmitButton>
            </form>
          ) : (
            <form action={linkStripeAccount}>
              <SubmitButton>Link your account to stripe</SubmitButton>
            </form>
          )}
        </CardContent>
      </Card>
    </Page>
  );
}
