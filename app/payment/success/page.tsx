import SuccessMessage from "@/app/components/SuccessMessage";

export default function SuccessPaymentPage() {
  return (
    <SuccessMessage
      title="Payment Successful"
      subtitle="Congrats on your purchase! You will receive an email with your
              order details."
    />
  );
}
