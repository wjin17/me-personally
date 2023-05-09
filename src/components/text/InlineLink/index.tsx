import { forwardRef, useEffect, useState } from "react";
import { FaLink, FaUnlink } from "react-icons/fa";
import { Transforms } from "slate";
import {
  ReactEditor,
  useSelected,
  useSlate,
  type RenderElementProps,
} from "slate-react";
import ActionButton from "~/components/buttons/ActionButton";
import type { LinkElement } from "~/components/editors/TextEditor/slate-types";
import { isUrl, unwrapLink } from "~/components/editors/TextEditor/utils";
import TextInput from "~/components/input/TextInput";

const InlineChromiumBugfix = () => (
  <span contentEditable={false} style={{ fontSize: 0 }}>
    {String.fromCodePoint(160) /* Non-breaking space */}
  </span>
);

type InlineLinkProps = React.ComponentPropsWithoutRef<"a"> &
  RenderElementProps & {
    element: LinkElement;
  };

export const InlineLinkEditor: React.FC<InlineLinkProps> = forwardRef<
  HTMLAnchorElement,
  InlineLinkProps
>(function InlineLink(
  { children, element, attributes, className, ...props },
  ref
) {
  const [link, setLink] = useState(element.url);
  const editor = useSlate() as ReactEditor;
  const selected = useSelected();

  useEffect(() => {
    if (!selected) setLink(element.url);
  }, [selected, element.url]);

  // experiment with position fixed for mobile

  function updateLink() {
    if (isUrl(link)) {
      const path = ReactEditor.findPath(editor, element);
      Transforms.setNodes(editor, { ...element, url: link }, { at: path });
    }
  }

  return (
    <span className="relative inline" {...attributes}>
      <a
        {...props}
        ref={ref}
        href={element.url}
        className={`relative underline ${
          selected ? "rounded-lg border-2 border-blue-500" : ""
        } ${className ?? ""}`}
      >
        <InlineChromiumBugfix />
        {children}
        <InlineChromiumBugfix />
      </a>
      {selected && (
        <span
          className="absolute left-0 top-8 z-50 flex"
          contentEditable={false}
          style={{ userSelect: "none" }}
        >
          <ActionButton
            className="bg-white dark:bg-black"
            onClick={() => unwrapLink(editor)}
          >
            <FaUnlink size={18} />
          </ActionButton>
          <ActionButton className="bg-white dark:bg-black" onClick={updateLink}>
            <FaLink size={18} />
          </ActionButton>
          <TextInput value={link} onChange={(e) => setLink(e.target.value)} />
        </span>
      )}
    </span>
  );
});

export const InlineLink: React.FC<InlineLinkProps> = forwardRef<
  HTMLAnchorElement,
  InlineLinkProps
>(function InlineLink(
  { children, element, attributes, className, ...props },
  ref
) {
  return (
    <span className="relative inline" {...attributes}>
      <a
        {...props}
        ref={ref}
        href={element.url}
        className={`relative underline ${className ?? ""}`}
      >
        <InlineChromiumBugfix />
        {children}
        <InlineChromiumBugfix />
      </a>
    </span>
  );
});
