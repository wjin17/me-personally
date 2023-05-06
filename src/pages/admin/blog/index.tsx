import type { ReactElement } from "react";

import BaseLayout from "~/layouts/base";
import type { NextPageWithLayout } from "../../_app";

const AdminBlog: NextPageWithLayout = () => {
  return (
    <>
      <h1>Admin blog page</h1>
    </>
  );
};

AdminBlog.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default AdminBlog;
