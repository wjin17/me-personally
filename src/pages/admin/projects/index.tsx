import { ReactElement, useState } from "react";
import ActionButton from "~/components/buttons/ActionButton";
import ProjectModal from "~/components/modals/ProjectModal";
import PageLink from "~/components/navigation/PageLink";
import Heading from "~/components/text/Heading";

import AdminLayout from "~/layouts/admin";

import type { NextPageWithLayout } from "../../_app";

const AdminProjects: NextPageWithLayout = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <div>
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center px-6">
        <h1>Admin project page</h1>
        <Heading size="lg" bold>
          Featured Projects
        </Heading>
        <ActionButton onClick={() => setProjectModalOpen(true)}>
          Add project
        </ActionButton>
      </div>
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center px-6">
        <h1>Admin project page</h1>
        <Heading size="lg" bold>
          Featured Projects
        </Heading>
        <PageLink href="/admin/projects/create">Add project</PageLink>
      </div>

      {projectModalOpen && (
        <ProjectModal onClose={() => setProjectModalOpen(false)} />
      )}
    </div>
  );
};

AdminProjects.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminProjects;
