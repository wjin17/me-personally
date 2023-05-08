import Heading from "~/components/text/Heading";
import { useForm } from "react-hook-form";

import BaseModal, { type BaseModalProps } from "../BaseModal";
import TextInput from "~/components/input/TextInput.tsx";
import ActionButton from "~/components/buttons/ActionButton";
import { api } from "~/utils/api";
import type {
  insertProjectsSchema,
  UpdateProjectParams,
} from "~/server/db/schema/projects";
import type { z } from "zod";
import ProjectCard from "~/components/cards/ProjectCard";

type ProjectData = z.infer<typeof insertProjectsSchema>;

interface ProjectModalProps extends BaseModalProps {
  project?: UpdateProjectParams;
  refetch?: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  refetch,
  onClose,
}) => {
  const { register, handleSubmit, watch } = useForm<ProjectData>({
    defaultValues: {
      title: project?.title ?? "",
      description: project?.description ?? "",
      github: project?.github ?? "",
      demo: project?.demo,
      image: project?.image ?? "",
    },
  });

  const { mutate: addProject } = api.projects.add.useMutation();
  const { mutate: updateProject } = api.projects.update.useMutation();

  const onSubmit = handleSubmit((data, e) => {
    e?.preventDefault();
    if (project?.id) {
      updateProject({ ...data, id: project.id, demo: data.demo ?? null });
    } else {
      addProject(data);
    }
    if (refetch) refetch();
    onClose();
  });

  const fieldValues = watch();

  return (
    <BaseModal onClose={onClose}>
      <div className="h-full w-full overflow-scroll rounded-lg bg-white px-8 pb-16 pt-8 shadow-brutal-black dark:bg-black dark:shadow-brutal-white">
        <Heading size="lg" bold>
          New project
        </Heading>
        <form onSubmit={(e) => void onSubmit(e)}>
          <label htmlFor="title">Title</label>
          <TextInput
            className="mb-8"
            placeholder="Title"
            {...register("title")}
          />
          <label htmlFor="description">Description</label>
          <TextInput
            id="description"
            className="mb-8"
            placeholder="Description"
            {...register("description")}
          />
          <label htmlFor="url">Github URL</label>
          <TextInput
            id="github"
            className="mb-8"
            placeholder="Github URL"
            {...register("github")}
          />
          <label htmlFor="url">Demo URL</label>
          <TextInput
            id="demo"
            className="mb-8"
            placeholder="Demo URL"
            {...register("demo")}
          />
          <label htmlFor="image">Image</label>
          <TextInput
            id="image"
            className="mb-8"
            placeholder="Image"
            {...register("image")}
          />
          <Heading size="lg" bold>
            Preview
          </Heading>
          <ProjectCard
            project={{ ...fieldValues, demo: fieldValues.demo ?? null }}
          />
          <div className="mt-8 flex justify-end">
            <ActionButton type="submit">
              {project ? "Update" : "Add"}
            </ActionButton>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default ProjectModal;
