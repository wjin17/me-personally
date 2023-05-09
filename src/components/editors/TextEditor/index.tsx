import { type ReactNode, useCallback } from "react";
import { Range, Transforms } from "slate";
import {
  Slate,
  Editable,
  type RenderElementProps,
  type RenderLeafProps,
  type ReactEditor,
} from "slate-react";
import { Element, Leaf } from "./Elements";

import type { CustomElement } from "./slate-types";

const defaultValue: CustomElement[] = [
  {
    type: "paragraph",
    align: "left",
    children: [{ text: "" }],
  },
];

type BaseEditorProps = {
  editor: ReactEditor;
  renderToolbar: () => ReactNode;
  initialValue?: CustomElement[];
};

const BaseEditor: React.FC<BaseEditorProps> = ({
  editor,
  renderToolbar,
  initialValue,
}) => {
  const renderElement = useCallback<(props: RenderElementProps) => JSX.Element>(
    (props) => <Element {...props} />,
    []
  );

  const renderLeaf = useCallback<(props: RenderLeafProps) => JSX.Element>(
    (props) => <Leaf {...props} />,
    []
  );

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
      if (e.key === "ArrowLeft" && !e.shiftKey) {
        e.preventDefault();
        Transforms.move(editor, { unit: "offset", reverse: true });
        return;
      }
      if (e.key === "ArrowRight" && !e.shiftKey) {
        e.preventDefault();
        Transforms.move(editor, { unit: "offset" });
        return;
      }
    }
  };

  return (
    <Slate editor={editor} value={initialValue ?? defaultValue}>
      {renderToolbar()}
      <Editable
        {...{ renderElement, renderLeaf, onKeyDown }}
        spellCheck
        placeholder="Write..."
        //autoFocus
      />
    </Slate>
  );
};

export default BaseEditor;
