import { type ReactElement } from "react";

import BaseLayout from "~/layouts/base";
import type { NextPageWithLayout } from "../../_app";
import BlogContentEditor from "~/components/editors/Blog";

const AdminBlogEditor: NextPageWithLayout = () => {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-6rem)] flex-col overflow-x-clip px-6 pb-64">
      <h1>Admin blog editor page</h1>
      <BlogContentEditor />
    </div>
  );
};

AdminBlogEditor.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default AdminBlogEditor;
