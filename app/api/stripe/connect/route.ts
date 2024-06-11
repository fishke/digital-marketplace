import { prisma } from "@/app/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

// use a webhook to update the user's stripeConnectLinked field
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "account.updated": {
      const account = event.data.object;

      const data = await prisma.user.update({
        where: {
          connectedAccountId: account.id,
        },
        data: {
          stripeConnectLinked: account.capabilities?.transfers === "active",
        },
      });

      break;
    }

    default:
      console.error("Unhandled event type.");
      break;
  }

  return new Response(null, { status: 200 });
}
