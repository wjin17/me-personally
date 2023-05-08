import { type ReactElement, useState } from "react";
import ActionButton from "~/components/buttons/ActionButton";
import ProjectCard from "~/components/cards/ProjectCard";
import ProjectModal from "~/components/modals/ProjectModal";
import Heading from "~/components/text/Heading";

import AdminLayout from "~/layouts/admin";
import type { UpdateProjectParams } from "~/server/db/schema/projects";
import { api } from "~/utils/api";

import type { NextPageWithLayout } from "../../_app";

const AdminProjects: NextPageWithLayout = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<
    UpdateProjectParams | undefined
  >();

  const { data, refetch } = api.projects.getAll.useQuery();

  return (
    <div>
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] flex-col px-6">
        <div className="mb-8 gap-4">
          <Heading size="lg" bold>
            Current Projects
          </Heading>
          <ActionButton
            onClick={() => {
              setCurrentProject(undefined);
              setProjectModalOpen(true);
            }}
          >
            Add project
          </ActionButton>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          {data &&
            data.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setCurrentProject(project);
                  setProjectModalOpen(true);
                }}
                className="h-full text-left"
              >
                <ProjectCard project={project} disabled />
              </button>
            ))}
        </div>
      </div>

      {projectModalOpen && (
        <ProjectModal
          onClose={() => setProjectModalOpen(false)}
          project={currentProject}
          refetch={() => void refetch()}
        />
      )}
    </div>
  );
};

AdminProjects.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminProjects;
