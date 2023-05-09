/* eslint-disable @next/next/no-img-element */
import { forwardRef } from "react";
import { Transforms } from "slate";
import {
  ReactEditor,
  useSelected,
  useSlateStatic,
  type RenderElementProps,
} from "slate-react";
import ActionButton from "~/components/buttons/ActionButton";
import type { ImageElement } from "~/components/editors/TextEditor/slate-types";

type BlogImageProps = React.ComponentPropsWithoutRef<"img"> &
  RenderElementProps & {
    element: ImageElement;
  };

const alignmentMap = {
  left: "mr-auto",
  center: "mx-auto",
  right: "ml-auto",
};

export const BlogImageEditor: React.FC<BlogImageProps> = forwardRef<
  HTMLImageElement,
  BlogImageProps
>(function InlineLink({ children, element, attributes, ...props }, ref) {
  const editor = useSlateStatic() as ReactEditor;
  const path = ReactEditor.findPath(editor, element);
  const selected = useSelected();

  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
        style={{ userSelect: "none" }}
        className={`relative ${
          selected ? "border-2 border-black dark:border-white" : ""
        }`}
      >
        <img
          ref={ref}
          src={element.url}
          className={`block max-h-[20rem] max-w-full ${
            alignmentMap[element.align]
          }`}
          alt=""
          {...props}
        />
        {selected && (
          <div className="absolute left-2 top-2 flex w-full gap-2">
            <ActionButton
              className="bg-white dark:bg-black"
              onClick={() => Transforms.removeNodes(editor, { at: path })}
            >
              Remove
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
});

export const BlogImage: React.FC<BlogImageProps> = forwardRef<
  HTMLImageElement,
  BlogImageProps
>(function InlineLink({ children, element, attributes, ...props }, ref) {
  return (
    <div {...attributes}>
      {children}
      <div
        contentEditable={false}
        style={{ userSelect: "none" }}
        className="relative"
      >
        <img
          ref={ref}
          src={element.url}
          className={`block max-h-[20rem] max-w-full ${
            alignmentMap[element.align]
          }`}
          alt=""
          {...props}
        />
      </div>
    </div>
  );
});
