import type { ReactElement } from "react";
import PageLink from "~/components/navigation/PageLink";
import Paragraph from "~/components/text/Paragraph";

import AdminLayout from "~/layouts/admin";
import type { NextPageWithLayout } from "../_app";

const Admin: NextPageWithLayout = () => {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center px-6">
      <PageLink className="mb-8 block w-full max-w-sm" href="/admin/blog">
        <Paragraph size="xl" bold>
          Blog
        </Paragraph>
      </PageLink>
      <PageLink className="block w-full max-w-sm" href="/admin/projects">
        <Paragraph size="xl" bold className="m-0">
          Projects
        </Paragraph>
      </PageLink>
    </div>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Admin;
