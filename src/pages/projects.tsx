import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";
import BaseLayout from "~/layouts/base";
import Heading from "~/components/text/Heading";
import ProjectCard from "~/components/cards/ProjectCard";
import { api } from "~/utils/api";

const Projects: NextPageWithLayout = () => {
  const { data } = api.projects.getAll.useQuery();
  return (
    <div>
      <section className="mx-auto mb-16 min-h-[calc(100vh-6rem)] px-6">
        <Heading size="xl">Featured projects</Heading>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          {data &&
            data.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </section>
    </div>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Projects;
