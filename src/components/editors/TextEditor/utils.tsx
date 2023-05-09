import {
  type BaseEditor,
  Element as SlateElement,
  Transforms,
  Range,
  Editor,
} from "slate";
import type { ReactEditor } from "slate-react";
import { z } from "zod";
import type {
  BlockElement,
  CustomElement,
  ImageElement,
  LinkElement,
} from "./slate-types";

const TEXT_ALIGNMENT = ["left", "center", "right", "justify"] as const;

export const alignmentSet = new Set<string>(TEXT_ALIGNMENT);
export type TextAlignment = (typeof TEXT_ALIGNMENT)[number];

const LIST_TYPES = ["numbered-list", "bulleted-list"];

export function isBlockActive(
  editor: BaseEditor,
  format: string,
  blockType = "type"
) {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (node) =>
        !Editor.isEditor(node) &&
        SlateElement.isElement(node) &&
        node[blockType as keyof typeof node] === format,
    })
  );

  return !!match;
}

export function toggleBlock(
  editor: BaseEditor,
  format: BlockElement["type"] | TextAlignment
) {
  const isActive = isBlockActive(
    editor,
    format,
    alignmentSet.has(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !alignmentSet.has(format),
    split: true,
  });

  let newProperties: Partial<CustomElement>;

  if (alignmentSet.has(format)) {
    newProperties = {
      align: isActive ? undefined : (format as TextAlignment),
    };
  } else {
    newProperties = {
      type: isActive
        ? "paragraph"
        : isList
        ? "list-item"
        : (format as BlockElement["type"]),
    };
  }
  Transforms.setNodes<CustomElement>(editor, newProperties);

  if (!isActive && isList) {
    const block: BlockElement = {
      type: format as BlockElement["type"],
      children: [],
    };
    Transforms.wrapNodes(editor, block);
  }
}

export function isMarkActive(editor: ReactEditor, format: string) {
  const marks = Editor.marks(editor);
  return marks ? marks[format as keyof typeof marks] === true : false;
}

export function toggleMark(editor: ReactEditor, format: string) {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

/************************ INLINE ELEMENTS ************************/
export function isUrl(url: string) {
  const { success } = z.string().url().safeParse(url);
  if (!success) return false;
  return true;
}

function isLinkActive(editor: ReactEditor) {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
  return !!link;
}

export function unwrapLink(editor: ReactEditor) {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
}

export function wrapLink(editor: ReactEditor, url: string) {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
}

export function withInlines(editor: ReactEditor) {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) =>
    ["link"].includes(element.type) || isInline(element);

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
}

/************************ Images ************************/

const imageExtensions = [
  "ase",
  "art",
  "bmp",
  "blp",
  "cd5",
  "cit",
  "cpt",
  "cr2",
  "cut",
  "dds",
  "dib",
  "djvu",
  "egt",
  "exif",
  "gif",
  "gpl",
  "grf",
  "icns",
  "ico",
  "iff",
  "jng",
  "jpeg",
  "jpg",
  "jfif",
  "jp2",
  "jps",
  "lbm",
  "max",
  "miff",
  "mng",
  "msp",
  "nef",
  "nitf",
  "ota",
  "pbm",
  "pc1",
  "pc2",
  "pc3",
  "pcf",
  "pcx",
  "pdn",
  "pgm",
  "PI1",
  "PI2",
  "PI3",
  "pict",
  "pct",
  "pnm",
  "pns",
  "ppm",
  "psb",
  "psd",
  "pdd",
  "psp",
  "px",
  "pxm",
  "pxr",
  "qfx",
  "raw",
  "rle",
  "sct",
  "sgi",
  "rgb",
  "int",
  "bw",
  "tga",
  "tiff",
  "tif",
  "vtf",
  "xbm",
  "xcf",
  "xpm",
  "3dv",
  "amf",
  "ai",
  "awg",
  "cgm",
  "cdr",
  "cmx",
  "dxf",
  "e2d",
  "egt",
  "eps",
  "fs",
  "gbr",
  "odg",
  "svg",
  "stl",
  "vrml",
  "x3d",
  "sxd",
  "v2d",
  "vnd",
  "wmf",
  "emf",
  "art",
  "xar",
  "png",
  "webp",
  "jxr",
  "hdp",
  "wdp",
  "cur",
  "ecw",
  "iff",
  "lbm",
  "liff",
  "nrrd",
  "pam",
  "pcx",
  "pgf",
  "sgi",
  "rgb",
  "rgba",
  "bw",
  "int",
  "inta",
  "sid",
  "ras",
  "sun",
  "tga",
  "heic",
  "heif",
];

function insertImage(editor: ReactEditor, url: string) {
  const text = { text: "" };
  const image: ImageElement = {
    type: "image",
    url,
    children: [text],
    align: "right",
  };
  Transforms.insertNodes(editor, image);
}

function isImageUrl(url: string | null) {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext ?? "");
}

export function withImages(editor: ReactEditor) {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, String(url));
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
}
