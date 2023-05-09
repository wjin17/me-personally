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
import { withImages, withInlines } from "../TextEditor/utils";

import { useForm } from "react-hook-form";

import TextInput from "~/components/input/TextInput";
import { api } from "~/utils/api";
import type { z } from "zod";
import { insertBlogPostSchema } from "~/server/db/schema/blogPosts";
import ToggleSwitch from "~/components/input/ToggleSwitch";
import { type Descendant } from "slate";
import { useRouter } from "next/router";

type BlogPostEditorProps = {
  id?: number;
  title?: string;
  postedAt?: string;
  hidden: boolean;
  initialValue?: Descendant[];
};

const blogPostSchema = insertBlogPostSchema.omit({
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
  const router = useRouter();
  const { register, handleSubmit, watch, setValue } = useForm<BlogPostData>({
    defaultValues: {
      title: title ?? "",
      postedAt: postedAt ?? "",
      hidden: hidden ?? false,
    },
  });

  const editor = useMemo(
    () => withImages(withInlines(withHistory(withReact(createEditor())))),
    []
  );

  const { mutate: addBlogPost, isLoading: isAdding } =
    api.blogPosts.add.useMutation();
  const { mutate: updateBlogPost, isLoading: isUpdating } =
    api.blogPosts.update.useMutation();

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();
    if (id) {
      updateBlogPost({ id, ...data, contents: editor.children });
    } else {
      //console.log("donut submit");
      addBlogPost({ ...data, contents: editor.children });
    }
    await router.push("/admin/blog");
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
          type="submit"
          disabled={isUpdating || isAdding}
        >
          {isUpdating || isAdding
            ? id
              ? "Updating"
              : "Saving"
            : id
            ? "Update"
            : "Save"}
        </ActionButton>
      </div>
    );
  };

  const isHidden = watch("hidden");

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
        <label htmlFor="hidden">{isHidden ? "Hidden" : "Public"}</label>
        <ToggleSwitch
          type="checkbox"
          id="hidden"
          {...register("hidden")}
          checked={isHidden}
          onClick={() => setValue("hidden", !isHidden)}
        />
        <BaseEditor
          editor={editor}
          renderToolbar={ToolBar}
          initialValue={initialValue}
        />
      </form>
    </div>
  );
};

export default BlogPostEditor;
