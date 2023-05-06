import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../_app";
import BaseLayout from "~/layouts/base";

const Blog: NextPageWithLayout = () => {
  return (
    <>
      <h1>Projects page</h1>
    </>
  );
};

Blog.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Blog;
