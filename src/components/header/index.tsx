import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import Hamburger from "hamburger-react";

import ExternalLink from "../navigation/ExternalLink";
import PageLink from "../navigation/PageLink";
import ToggleDarkMode from "../button/ToggleDarkMode";
import MobileNav from "./MobileNav";

type HeaderProps = React.ComponentPropsWithoutRef<"div">;

const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div
      {...props}
      className="sticky top-0 flex flex-row items-center justify-between bg-white px-8 py-4 dark:bg-black"
    >
      <Link href="/" className="z-50">
        <Image src="/static/pooio.png" alt="me" width="64" height="64" />
      </Link>

      <div className="hidden flex-row items-center gap-8 sm:flex">
        <ExternalLink href="https://github.com/wjin17" noStyle>
          <AiFillGithub size="1.75rem" />
        </ExternalLink>
        <ExternalLink href="https://www.linkedin.com/in/willjin1796" noStyle>
          <FaLinkedinIn size="1.5rem" className="m-[0.25rem]" />
        </ExternalLink>
        <PageLink href="/blog">Blog</PageLink>
        <PageLink href="/project">Projects</PageLink>
        <ToggleDarkMode />
      </div>

      <div className="z-50 sm:hidden">
        <Hamburger direction="right" toggled={isOpen} toggle={setOpen} />
      </div>
      <MobileNav isOpen={isOpen} close={() => setOpen(false)} />
    </div>
  );
};

export default Header;
