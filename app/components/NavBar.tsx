import Link from "next/link";
import NavbarLinks from "./NavbarLinks";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";

export default function NavBar() {
  return (
    <nav className="relative flex items-center w-full px-4 mx-auto max-w-7xl md:grid md:grid-cols-12 md:px-8 py-7">
      <div className="md:col-span-3">
        <Link href="/">
          <h1 className="text-2xl font-semibold">
            Tomer<span className="text-primary">UI</span>
          </h1>
        </Link>
      </div>
      <NavbarLinks />
      <div className="flex items-center gap-2 ml-auto ms-2">
        <Button>Log In</Button>
        <Button variant="secondary">Register</Button>
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
