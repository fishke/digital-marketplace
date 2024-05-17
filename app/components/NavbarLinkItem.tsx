import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  link: {
    id: number;
    name: string;
    href: string;
  };
};

export default function NavbarLinkItem({ link }: Props) {
  const location = usePathname();
  return (
    <Link
      href={link.href}
      className={cn(
        location === link.href ? "bg-muted" : "hover:bg-muted/75 ",
        "group flex items-center p-2 font-medium rounded-md"
      )}
    >
      {link.name}
    </Link>
  );
}
