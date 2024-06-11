import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPaymentPage() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-96">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <XCircle className="w-12 h-12  rounded-full bg-red-500/30 text-red-500 p-2" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">Payment Cancelled</h3>
            <p className="mt-2 text-sm text-muted-foreground text-balance">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Something went wrong with your payment. You haven't been charged.
              Please try again.
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
