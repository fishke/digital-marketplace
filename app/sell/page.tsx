import { Card } from "@/components/ui/card";
import Page from "../components/Page";

import { SellForm } from "./_components/SellForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function SellPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }
  return (
    <Page>
      <Card>
        <SellForm />
      </Card>
    </Page>
  );
}
