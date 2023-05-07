import { signOut } from "next-auth/react";

import PageLink from "../../navigation/PageLink";
import ToggleDarkMode from "../../buttons/ToggleDarkMode";
import ActionButton from "~/components/buttons/ActionButton";

interface AdminMobileNavProps extends React.ComponentPropsWithoutRef<"div"> {
  isOpen: boolean;
}

const AdminMobileNav: React.FC<AdminMobileNavProps> = ({
  isOpen,
  ...props
}) => {
  if (!isOpen) return null;
  return (
    <div
      {...props}
      className="absolute left-0 top-0 flex h-screen w-screen flex-col bg-white px-8 py-4 transition-opacity dark:bg-black sm:hidden"
    >
      <div className="my-auto flex flex-col items-center gap-8">
        <PageLink href="/admin/blog">Blog</PageLink>
        <PageLink href="/admin/projects">Projects</PageLink>
        <ActionButton
          onClick={() => void signOut()}
          className="text-lg font-bold"
        >
          Sign out
        </ActionButton>
        <ToggleDarkMode />
      </div>
    </div>
  );
};

export default AdminMobileNav;
