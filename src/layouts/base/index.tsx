import Head from "next/head";
import Header from "~/components/header/BaseHeader";

type BaseLayoutProps = React.ComponentPropsWithoutRef<"header">;

const BaseLayout: React.FC<BaseLayoutProps> = ({ children, ...props }) => {
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
      <Header />
      {children}
    </div>
  );
};

export default BaseLayout;
