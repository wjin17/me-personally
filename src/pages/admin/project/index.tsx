import type { ReactElement } from "react";

import BaseLayout from "~/layouts/base";
import type { NextPageWithLayout } from "../../_app";

const AdminProject: NextPageWithLayout = () => {
  return (
    <>
      <h1>Admin project page</h1>
    </>
  );
};

AdminProject.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default AdminProject;
