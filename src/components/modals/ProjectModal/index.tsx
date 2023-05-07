import Heading from "~/components/text/Heading";
import { useForm } from "react-hook-form";

import BaseModal, { type BaseModalProps } from "../BaseModal";
import TextInput from "~/components/input/TextInput.tsx";
import ActionButton from "~/components/buttons/ActionButton";
import { api } from "~/utils/api";
import type { insertProjectsSchema } from "~/server/db/schema/projects";
import type { z } from "zod";
import ProjectCard from "~/components/cards/ProjectCard";

type ProjectData = z.infer<typeof insertProjectsSchema>;

const ProjectModal: React.FC<BaseModalProps> = ({ onClose }) => {
  const { register, handleSubmit, watch } = useForm<ProjectData>({
    defaultValues: {
      title: "VisuAl",
      description:
        "A static website visualizing some data structures and algorithms.",
      url: "https://github.com/wjin17/VisuAl",
      image:
        "https://raw.githubusercontent.com/wjin17/VisuAl/master/img/DijkstraGif.gif",
    },
  });

  const { mutate } = api.projects.add.useMutation();

  const onSubmit = handleSubmit((data, e) => {
    e?.preventDefault();
    mutate(data);
    onClose();
  });

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
          <label htmlFor="url">Url</label>
          <TextInput
            id="url"
            className="mb-8"
            placeholder="URL"
            {...register("url")}
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
          <ProjectCard project={watch()} />
          <div className="mt-8 flex justify-end">
            <ActionButton type="submit">Submit</ActionButton>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default ProjectModal;
