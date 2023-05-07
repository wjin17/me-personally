import Head from "next/head";
import AdminHeader from "~/components/header/AdminHeader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type AdminLayoutProps = React.ComponentPropsWithoutRef<"header">;

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, ...props }) => {
  const { data, status } = useSession();
  const router = useRouter();
  if (status !== "loading" && !data) void router.push("/admin/signin");
  if (status === "loading" || !data) return null;
  return (
    <div {...props} className="mx-auto max-w-7xl dark:bg-black">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <AdminHeader />
      {children}
    </div>
  );
};

export default AdminLayout;
