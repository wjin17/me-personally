import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

interface PageLinkProps extends LinkProps {
  children: ReactNode;
  noStyle?: boolean;
}

const PageLink: React.FC<PageLinkProps> = ({ children, noStyle, ...props }) => {
  if (noStyle) {
    return (
      <Link
        {...props}
        className="rounded-full border-2 border-black p-2 shadow-brutal-black active:translate-x-[4px] active:translate-y-[4px] active:shadow-none dark:border-white dark:shadow-brutal-white dark:active:shadow-none"
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      {...props}
      className="rounded-lg border-2 border-black px-4 py-2 text-lg font-bold shadow-brutal-black active:translate-x-[4px] active:translate-y-[4px] active:shadow-none dark:border-white dark:shadow-brutal-white dark:active:shadow-none"
    >
      {children}
    </Link>
  );
};

export default PageLink;
