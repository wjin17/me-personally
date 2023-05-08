import { type ReactNode, useCallback, useState } from "react";
import { createEditor } from "slate";
import {
  Slate,
  Editable,
  withReact,
  type RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { Element, Leaf } from "./Elements";

type CustomText = {
  text: string;
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
};
interface CustomElement {
  type: string;
  children: CustomText[];
  align?: string;
}

declare module "slate" {
  interface CustomTypes {
    Element: CustomElement;
    Text: CustomText;
  }
}

const initialValue: CustomElement[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

type BaseEditorProps = {
  renderToolbar: () => ReactNode;
};

const BaseEditor: React.FC<BaseEditorProps> = ({ renderToolbar }) => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback<(props: RenderElementProps) => JSX.Element>(
    (props) => <Element {...props} />,
    []
  );

  const renderLeaf = useCallback<(props: RenderLeafProps) => JSX.Element>(
    (props) => <Leaf {...props} />,
    []
  );

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
      {renderToolbar()}
    </Slate>
  );
};

export default BaseEditor;
