type Props = {
  children: React.ReactNode;
};

export default function ProductLabel({ children }: Props) {
  return (
    <h3 className="text-sm font-medium text-muted-foreground col-span-1">
      {children}
    </h3>
  );
}
