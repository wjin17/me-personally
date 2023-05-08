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

const BlogPostEditor = () => {
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    []
  );

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
      <BaseEditor editor={editor} renderToolbar={ToolBar} />
    </div>
  );
};

export default BlogPostEditor;
