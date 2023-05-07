import Head from "next/head";
import AdminHeader from "~/components/header/AdminHeader";

type AdminLayoutProps = React.ComponentPropsWithoutRef<"header">;

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, ...props }) => {
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
