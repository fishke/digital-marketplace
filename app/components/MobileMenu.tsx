"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navbarLinks } from "./NavbarLinks";
import Link from "next/link";
import NavbarLinkItem from "./NavbarLinkItem";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col px-2 mt-5 gap-y-1">
          {navbarLinks.map((link) => (
            <NavbarLinkItem key={link.id} link={link} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
