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

const ToolBar = () => {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
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
    </div>
  );
};

const BlogPostEditor = () => {
  return (
    <div className="rounded-lg border-2 border-black p-4 dark:border-white">
      <BaseEditor renderToolbar={ToolBar} />
    </div>
  );
};

export default BlogPostEditor;
