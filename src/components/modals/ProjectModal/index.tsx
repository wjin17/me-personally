import Heading from "~/components/text/Heading";
import { useForm } from "react-hook-form";

import BaseModal, { type BaseModalProps } from "../BaseModal";
import TextInput from "~/components/input/TextInput.tsx";
import ActionButton from "~/components/buttons/ActionButton";

type ProjectFormData = {
  title: string;
  description: string;
  url: string;
  image: string;
};

const ProjectModal: React.FC<BaseModalProps> = ({ onClose }) => {
  const { register, handleSubmit, getValues, setValue } =
    useForm<ProjectFormData>();

  const onSubmit = handleSubmit((data, e) => {
    e?.preventDefault();
    console.log(data);
  });

  return (
    <BaseModal onClose={onClose}>
      <div className="h-full w-full overflow-scroll rounded-lg bg-white px-4 pb-8 pt-4 shadow-brutal-black dark:bg-black dark:shadow-brutal-white">
        <Heading size="lg" bold>
          New project
        </Heading>
        <form onSubmit={(e) => void onSubmit(e)}>
          <label htmlFor="title">Title</label>
          <TextInput
            id="title"
            className="mb-8"
            {...register("title")}
            value={getValues("title")}
            onChange={(e) => setValue("title", e.target.value)}
            placeholder="Project title"
          />
          <label htmlFor="description">Description</label>
          <TextInput
            id="description"
            className="mb-8"
            {...register("description")}
            value={getValues("description")}
            onChange={(e) => setValue("description", e.target.value)}
            placeholder="Description"
          />
          <label htmlFor="url">Url</label>
          <TextInput
            id="url"
            className="mb-8"
            {...register("url")}
            value={getValues("url")}
            onChange={(e) => setValue("url", e.target.value)}
            placeholder="URL"
          />
          <label htmlFor="image">Image</label>
          <TextInput
            id="image"
            className="mb-8"
            {...register("image")}
            value={getValues("image")}
            onChange={(e) => setValue("image", e.target.value)}
            placeholder="Image"
          />
          <div className="flex justify-end">
            <ActionButton type="submit">Submit</ActionButton>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default ProjectModal;
