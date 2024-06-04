type Props = {
  children: React.ReactNode;
};

export default function ProductValue({ children }: Props) {
  return <h3 className="text-sm font-medium col-span-1">{children}</h3>;
}
