import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../_app";
import BaseLayout from "~/layouts/base";

const BlogPost: NextPageWithLayout = () => {
  return (
    <>
      <h1>Blog post page</h1>
    </>
  );
};

BlogPost.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default BlogPost;
