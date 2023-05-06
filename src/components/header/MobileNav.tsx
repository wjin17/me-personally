import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

import ExternalLink from "../navigation/ExternalLink";
import PageLink from "../navigation/PageLink";
import ToggleDarkMode from "../button/ToggleDarkMode";

interface MobileNavProps extends React.ComponentPropsWithoutRef<"div"> {
  isOpen: boolean;
  close: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, close, ...props }) => {
  if (!isOpen) return null;
  return (
    <div
      {...props}
      className="absolute left-0 top-0 flex h-screen w-screen flex-col bg-white px-8 py-4 transition-opacity dark:bg-black sm:hidden"
    >
      <div className="my-auto flex flex-col items-center gap-8">
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

export default MobileNav;
