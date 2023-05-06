import type { ReactElement } from "react";

import BaseLayout from "~/layouts/base";
import type { NextPageWithLayout } from "../../_app";

const AdminBlogEditor: NextPageWithLayout = () => {
  return (
    <>
      <h1>Admin blog editor</h1>
    </>
  );
};

AdminBlogEditor.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default AdminBlogEditor;
