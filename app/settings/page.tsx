import { Card } from "@/components/ui/card";
import Page from "@/app/components/Page";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/app/lib/db";
import SettingsForm from "./_components/SettingsForm";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      lastName: true,
      firstName: true,
      email: true,
    },
  });

  return data;
}
export default async function SettingsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Not authorized");
  }

  const data = await getData(user.id);
  return (
    <Page>
      <Card>
        <SettingsForm />
      </Card>
    </Page>
  );
}
