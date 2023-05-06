import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";
import BaseLayout from "~/layouts/base";

const Projects: NextPageWithLayout = () => {
  return (
    <>
      <h1>Projects page</h1>
    </>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Projects;
