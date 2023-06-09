import { type ReactEditor, useSlate } from "slate-react";
import type { IconType } from "react-icons";

import {
  isBlockActive,
  isMarkActive,
  alignmentSet,
  toggleBlock,
  toggleMark,
  type TextAlignment,
} from "./utils";
import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaCode,
  FaItalic,
  FaListOl,
  FaListUl,
  FaUnderline,
} from "react-icons/fa";
import ActionButton from "~/components/buttons/ActionButton";
import { Fragment, useState } from "react";
import type { BlockElement } from "./slate-types";

interface BlockIconButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  format: BlockElement["type"] | TextAlignment;
  icon: IconType;
}

const BlockIconButton = ({
  format,
  icon,
}: BlockIconButtonProps): JSX.Element => {
  const editor = useSlate();
  const active = isBlockActive(
    editor,
    format,
    alignmentSet.has(format) ? "align" : "type"
  );
  return (
    <ActionButton
      className={`bg-opacity-70 ${active ? "bg-neutral-500" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon({ size: 18 })}
    </ActionButton>
  );
};

export const LeftAlignButton = () =>
  BlockIconButton({
    format: "left",
    icon: FaAlignLeft,
  });

export const CenterAlignButton = () =>
  BlockIconButton({
    format: "center",
    icon: FaAlignCenter,
  });

export const RightAlignButton = () =>
  BlockIconButton({
    format: "right",
    icon: FaAlignRight,
  });

export const JustifyAlignButton = () =>
  BlockIconButton({
    format: "justify",
    icon: FaAlignJustify,
  });

export const NumberedListButton = () =>
  BlockIconButton({
    format: "numbered-list",
    icon: FaListOl,
  });

export const BulletedListButton = () =>
  BlockIconButton({
    format: "bulleted-list",
    icon: FaListUl,
  });

export const TEXT_SIZE_TYPES = [
  "heading-one",
  "heading-two",
  "heading-three",
  "paragraph",
];

const sizeLabelMap = {
  "heading-one": "Heading 1",
  "heading-two": "Heading 2",
  "heading-three": "Heading 3",
  paragraph: "Paragraph",
};

interface BlockTextButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  format: BlockElement["type"] | TextAlignment;
  title: string;
  closeMenu: () => void;
}

const BlockTextButton = ({
  format,
  title,
  closeMenu,
}: BlockTextButtonProps): JSX.Element => {
  const editor = useSlate();
  const active = isBlockActive(
    editor,
    format,
    alignmentSet.has(format) ? "align" : "type"
  );
  return (
    <button
      className={`w-full rounded-lg bg-opacity-50 py-2 hover:bg-neutral-600 hover:bg-opacity-50 ${
        active ? "bg-neutral-500" : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        toggleBlock(editor, format);
        closeMenu();
      }}
    >
      {title}
    </button>
  );
};

export const BlockDropdown = () => {
  const [open, setOpen] = useState(false);
  const editor = useSlate();
  const currentType = TEXT_SIZE_TYPES.find((type) =>
    isBlockActive(editor, type)
  ) as keyof typeof sizeLabelMap;

  const sizes = Object.entries(sizeLabelMap);

  return (
    <div className="relative w-36">
      <ActionButton
        onClick={() => setOpen((prev) => !prev)}
        className="w-full font-bold"
      >
        {sizeLabelMap[currentType] ?? "Paragraph"}
      </ActionButton>
      <div
        className={`absolute flex w-full flex-col gap-2 rounded-lg border-2 border-black bg-white px-2 py-4 shadow-brutal-black dark:border-white dark:bg-black dark:shadow-brutal-white ${
          open ? "block" : "hidden"
        }`}
      >
        {sizes.map(([key, value]) => (
          <Fragment key={key}>
            {BlockTextButton({
              format: key as keyof typeof sizeLabelMap,
              title: value,
              closeMenu: () => setOpen(false),
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

type MarkButtonProps = {
  format: string;
  icon: IconType;
};

const MarkButton = ({ format, icon }: MarkButtonProps): JSX.Element => {
  const editor = useSlate() as ReactEditor;
  const active = isMarkActive(editor, format);
  return (
    <ActionButton
      className={`bg-opacity-70 ${active ? "bg-neutral-500" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon({ size: 18 })}
    </ActionButton>
  );
};

export const BoldMarkButton = () =>
  MarkButton({
    format: "bold",
    icon: FaBold,
  });

export const CodeMarkButton = () =>
  MarkButton({
    format: "code",
    icon: FaCode,
  });

export const ItalicMarkButton = () =>
  MarkButton({
    format: "italic",
    icon: FaItalic,
  });

export const UnderlineMarkButton = () =>
  MarkButton({
    format: "underline",
    icon: FaUnderline,
  });
