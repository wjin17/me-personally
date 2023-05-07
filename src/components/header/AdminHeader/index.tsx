import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Hamburger from "hamburger-react";

import PageLink from "../../navigation/PageLink";
import ToggleDarkMode from "../../buttons/ToggleDarkMode";
import AdminMobileNav from "./AdminMobileNav";
import ActionButton from "~/components/buttons/ActionButton";
import { signOut } from "next-auth/react";
// import MobileNav from "./MobileNav";

type AdminHeaderProps = React.ComponentPropsWithoutRef<"div">;

const AdminHeader: React.FC<AdminHeaderProps> = ({ ...props }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div
      {...props}
      className="sticky top-0 z-40 flex flex-row items-center justify-between bg-white px-8 py-4 dark:bg-black"
    >
      <Link href="/" className="z-50 flex">
        <Image src="/static/pooio.png" alt="me" width="64" height="64" />
      </Link>

      <div className="hidden flex-row items-center gap-8 sm:flex">
        <PageLink href="/blog">Blog</PageLink>
        <PageLink href="/project">Projects</PageLink>
        <ActionButton
          onClick={() => void signOut()}
          className="text-lg font-bold"
        >
          Sign out
        </ActionButton>
        <ToggleDarkMode />
      </div>

      <div className="z-50 sm:hidden">
        <Hamburger
          direction="right"
          toggled={isOpen}
          toggle={setOpen}
          rounded
        />
      </div>
      <AdminMobileNav isOpen={isOpen} />
    </div>
  );
};

export default AdminHeader;
