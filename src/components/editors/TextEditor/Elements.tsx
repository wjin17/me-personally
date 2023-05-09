import type { RenderElementProps, RenderLeafProps } from "slate-react";
import { BlogImage, BlogImageEditor } from "~/components/text/BlogImage";
import Heading from "~/components/text/Heading";
import { InlineLink, InlineLinkEditor } from "~/components/text/InlineLink";
import Paragraph from "~/components/text/Paragraph";

const alignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export const Element = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  switch (element.type) {
    case "heading-one": {
      const alignment = element.align ?? "left";
      return (
        <Heading {...attributes} className={`${alignMap[alignment]}`} size="xl">
          {children}
        </Heading>
      );
    }
    case "heading-two": {
      const alignment = element.align ?? "left";
      return (
        <Heading {...attributes} className={`${alignMap[alignment]}`} size="lg">
          {children}
        </Heading>
      );
    }
    case "heading-three": {
      const alignment = element.align ?? "left";
      return (
        <Heading {...attributes} className={`${alignMap[alignment]}`} size="md">
          {children}
        </Heading>
      );
    }
    case "bulleted-list": {
      const alignment = element.align ?? "left";
      return (
        <ul
          {...attributes}
          className={`list-inside list-disc ${alignMap[alignment]}`}
        >
          {children}
        </ul>
      );
    }
    case "list-item": {
      const alignment = element.align ?? "left";
      return (
        <li {...attributes} className={`${alignMap[alignment]}`}>
          {children}
        </li>
      );
    }
    case "numbered-list": {
      const alignment = element.align ?? "left";
      return (
        <ol
          {...attributes}
          className={`list-inside list-decimal ${alignMap[alignment]}`}
        >
          {children}
        </ol>
      );
    }
    case "link": {
      return (
        <InlineLinkEditor {...{ attributes, element }}>
          {children}
        </InlineLinkEditor>
      );
    }
    case "image": {
      return (
        <BlogImageEditor {...{ attributes, element }}>
          {children}
        </BlogImageEditor>
      );
    }
    default: {
      const alignment = element.align ?? "left";
      return (
        <Paragraph {...attributes} className={`${alignMap[alignment]}`}>
          {children}
        </Paragraph>
      );
    }
  }
};

export const ViewElement = ({
  attributes,
  children,
  element,
}: RenderElementProps) => {
  switch (element.type) {
    case "heading-one": {
      const alignment = element.align ?? "left";
      return (
        <Heading {...attributes} className={`${alignMap[alignment]}`} size="xl">
          {children}
        </Heading>
      );
    }
    case "heading-two": {
      const alignment = element.align ?? "left";
      return (
        <Heading {...attributes} className={`${alignMap[alignment]}`} size="lg">
          {children}
        </Heading>
      );
    }
    case "heading-three": {
      const alignment = element.align ?? "left";
      return (
        <Heading {...attributes} className={`${alignMap[alignment]}`} size="md">
          {children}
        </Heading>
      );
    }
    case "bulleted-list": {
      const alignment = element.align ?? "left";
      return (
        <ul
          {...attributes}
          className={`list-inside list-disc ${alignMap[alignment]}`}
        >
          {children}
        </ul>
      );
    }
    case "list-item": {
      const alignment = element.align ?? "left";
      return (
        <li {...attributes} className={`${alignMap[alignment]}`}>
          {children}
        </li>
      );
    }
    case "numbered-list": {
      const alignment = element.align ?? "left";
      return (
        <ol
          {...attributes}
          className={`list-inside list-decimal ${alignMap[alignment]}`}
        >
          {children}
        </ol>
      );
    }
    case "link": {
      return <InlineLink {...{ attributes, element }}>{children}</InlineLink>;
    }
    case "image": {
      return <BlogImage {...{ attributes, element }}>{children}</BlogImage>;
    }
    default: {
      const alignment = element.align ?? "left";
      return (
        <Paragraph {...attributes} className={`${alignMap[alignment]}`}>
          {children}
        </Paragraph>
      );
    }
  }
};

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
