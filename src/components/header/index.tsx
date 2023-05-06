import Image from "next/image";
import Link from "next/link";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import ToggleDarkMode from "../button/ToggleDarkMode";

import ExternalLink from "../navigation/ExternalLink";
import PageLink from "../navigation/PageLink";

type HeaderProps = React.ComponentPropsWithoutRef<"div">;

const Header: React.FC<HeaderProps> = ({ ...props }) => {
  return (
    <div
      {...props}
      className="mx-auto flex max-w-7xl flex-row justify-between px-8 py-4"
    >
      <Link href="/">
        <Image src="/static/pooio.png" alt="me" width="64" height="64" />
      </Link>
      <div className="flex flex-row items-center gap-8">
        <ExternalLink href="https://github.com/wjin17" noStyle>
          <AiFillGithub size="1.75rem" />
        </ExternalLink>
        <ExternalLink href="https://www.linkedin.com/in/willjin1796" noStyle>
          <AiFillLinkedin size="1.75rem" />
        </ExternalLink>
        <PageLink href="/blog">Blog</PageLink>
        <PageLink href="/project">Projects</PageLink>
        <ToggleDarkMode />
      </div>
    </div>
  );
};

export default Header;
