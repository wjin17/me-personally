import type { Descendant } from "slate";

export interface BaseElement {
  type: string;
  children: Descendant[];
}

export interface BaseBlockElement extends BaseElement {
  align?: "left" | "center" | "right" | "justify";
}

export interface HeadingElement extends BaseBlockElement {
  type: "heading-one" | "heading-two" | "heading-three";
}

export interface ParagraphElement extends BaseBlockElement {
  type: "paragraph";
}

export interface ListElement extends BaseBlockElement {
  type: "bulleted-list" | "list-item" | "numbered-list";
}

export interface LinkElement extends BaseElement {
  type: "link";
  url: string;
}

export interface ImageElement extends BaseElement {
  type: "image";
  url: string;
  align: "left" | "center" | "right";
}

export type BlockElement = HeadingElement | ParagraphElement | ListElement;

export type InlineElement = LinkElement;

export type CustomElement = BlockElement | InlineElement | ImageElement;

type CustomText = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  text: string;
};

declare module "slate" {
  interface CustomTypes {
    Element: CustomElement;
    Text: CustomText;
  }
}
