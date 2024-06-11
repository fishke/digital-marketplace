import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessPaymentPage() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-96">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="w-12 h-12  rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              Payment Successful
            </h3>
            <p className="mt-2 text-sm text-muted-foreground text-balance">
              Congrats on your purchase! You will receive an email with your
              order details.
            </p>

            <Button className="mt-5 w-full sm:mt-6" asChild>
              <Link href="/">Go back to HomePage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
