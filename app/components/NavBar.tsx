import Link from "next/link";
import NavbarLinks from "./NavbarLinks";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./UserNav";

export default async function NavBar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="relative flex items-center w-full px-4 mx-auto max-w-7xl md:grid md:grid-cols-12 md:px-8 py-7 justify-between">
      <div className="md:col-span-3">
        <Link href="/">
          <h1 className="text-2xl font-semibold">
            Tomer<span className="text-primary">UI</span>
          </h1>
        </Link>
      </div>
      <NavbarLinks />
      <div className="flex items-center gap-2 ml-auto ms-2">
        {user ? (
          <UserNav
            email={user.email!}
            name={user.given_name!}
            userImage={
              user.picture || `https://avatar.vercel.sh/${user.given_name}`
            }
          />
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild>
              <LoginLink>Log In</LoginLink>
            </Button>
            <Button variant="secondary" asChild>
              <RegisterLink>Register</RegisterLink>
            </Button>
          </div>
        )}

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
