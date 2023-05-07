import type { ReactElement } from "react";

import AdminLayout from "~/layouts/admin";
import type { NextPageWithLayout } from "../_app";

const Admin: NextPageWithLayout = () => {
  return (
    <>
      <h1>Admin sign in page</h1>
    </>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Admin;
