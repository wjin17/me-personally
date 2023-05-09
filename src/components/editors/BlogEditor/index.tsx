import { useMemo } from "react";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import { withHistory } from "slate-history";
import ActionButton from "~/components/buttons/ActionButton";

import BaseEditor from "../TextEditor";
import {
  BlockDropdown,
  BoldMarkButton,
  BulletedListButton,
  CenterAlignButton,
  CodeMarkButton,
  ItalicMarkButton,
  JustifyAlignButton,
  LeftAlignButton,
  NumberedListButton,
  RightAlignButton,
  UnderlineMarkButton,
} from "../TextEditor/Buttons";
import { withInlines } from "../TextEditor/utils";
import type { CustomElement } from "../TextEditor/slate-types";

import { useForm } from "react-hook-form";

import TextInput from "~/components/input/TextInput";
// import { api } from "~/utils/api";
// import type {
//   insertProjectSchema,
//   UpdateProjectParams,
// } from "~/server/db/schema/projects";
import type { z } from "zod";
import { insertBlogPostSchema } from "~/server/db/schema/blogPosts";
import Heading from "~/components/text/Heading";
import ToggleSwitch from "~/components/input/ToggleSwitch";

type BlogPostEditorProps = {
  id?: number;
  title?: string;
  postedAt?: string;
  hidden: boolean;
  initialValue?: CustomElement[];
};

const blogPostSchema = insertBlogPostSchema.omit({
  slug: true,
  contents: true,
});

type BlogPostData = z.infer<typeof blogPostSchema>;

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({
  id,
  title,
  postedAt,
  hidden,
  initialValue,
}) => {
  const { register, handleSubmit, watch } = useForm<BlogPostData>({
    defaultValues: {
      title: title ?? "",
      postedAt: postedAt ?? "",
      hidden: hidden ?? false,
    },
  });

  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    []
  );

  const onSubmit = handleSubmit((data, e) => {
    e?.preventDefault();
    console.log(data);
  });

  const ToolBar = () => {
    return (
      <div className="sticky top-24 z-30 mb-8 mt-4 flex flex-wrap gap-4 rounded-lg border-2 border-black bg-white p-4 dark:border-white dark:bg-black">
        <LeftAlignButton />
        <CenterAlignButton />
        <RightAlignButton />
        <JustifyAlignButton />
        <BlockDropdown />
        <NumberedListButton />
        <BulletedListButton />
        <div className="flex flex-wrap gap-2">
          <BoldMarkButton />
          <CodeMarkButton />
          <ItalicMarkButton />
          <UnderlineMarkButton />
        </div>
        <ActionButton
          className="ml-auto"
          onClick={() => console.log(editor.children)}
        >
          Save
        </ActionButton>
      </div>
    );
  };

  return (
    <div className="rounded-lg border-2 border-black p-4 dark:border-white">
      <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col">
        <label htmlFor="title">Title</label>
        <TextInput
          className="mb-8 sm:max-w-[50%]"
          placeholder="Title"
          {...register("title")}
        />
        <label htmlFor="postedAt">Date</label>
        <TextInput
          id="postedAt"
          className="mb-8 sm:max-w-[50%]"
          placeholder="YYYY-MM-DD"
          {...register("postedAt")}
        />
        <ToggleSwitch />
        {/* <label htmlFor="url">Hidden</label>
        <TextInput
          id="hidden"
          className="mb-8 sm:max-w-[50%]"
          placeholder="Hidden"
          {...register("hidden")}
        /> */}
      </form>
      <BaseEditor
        editor={editor}
        renderToolbar={ToolBar}
        initialValue={initialValue}
      />
    </div>
  );
};

export default BlogPostEditor;
