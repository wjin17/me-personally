import BaseEditor from "../WYSIWYG";
import {
  BlockDropdown,
  BoldMarkButton,
  CenterAlignButton,
  CodeMarkButton,
  ItalicMarkButton,
  JustifyAlignButton,
  LeftAlignButton,
  RightAlignButton,
  UnderlineMarkButton,
} from "../WYSIWYG/Buttons";

const ToolBar = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <LeftAlignButton />
      <CenterAlignButton />
      <RightAlignButton />
      <JustifyAlignButton />
      <BlockDropdown />
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
