import type { ReactElement } from "react";

import BaseLayout from "~/layouts/base";
import type { NextPageWithLayout } from "../../_app";

const AdminProjectEditor: NextPageWithLayout = () => {
  return (
    <>
      <h1>Admin project editor page</h1>
    </>
  );
};

AdminProjectEditor.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default AdminProjectEditor;
