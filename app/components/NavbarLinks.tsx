"use client";

import NavbarLinkItem from "./NavbarLinkItem";

export const navbarLinks = [
  { id: 0, name: "Home", href: "/" },
  { id: 1, name: "Templates", href: "#" },
  { id: 2, name: "Ui Kits", href: "#" },
  { id: 3, name: "Icons", href: "#" },
];
export default function NavbarLinks() {
  return (
    <div className="items-center justify-center hidden col-span-6 md:flex gap-x-2">
      {navbarLinks.map((link) => (
        <NavbarLinkItem key={link.id} link={link} />
      ))}
    </div>
  );
}
