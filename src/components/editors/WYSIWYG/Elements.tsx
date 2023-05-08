import type { RenderElementProps, RenderLeafProps } from "slate-react";
import Heading from "~/components/text/Heading";
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
  const alignment = (element.align ?? "left") as keyof typeof alignMap;
  switch (element.type) {
    // case "bulleted-list":
    //   return (
    //     <ul style={style} {...attributes}>
    //       {children}
    //     </ul>
    //   );
    case "heading-one":
      return (
        <Heading {...attributes} className={`${alignMap[alignment]}`} size="xl">
          {children}
        </Heading>
      );
    case "heading-two":
      return (
        <Heading {...attributes} className={`${alignMap[alignment]}`} size="lg">
          {children}
        </Heading>
      );
    case "heading-three":
      return (
        <Heading {...attributes} className={`${alignMap[alignment]}`} size="md">
          {children}
        </Heading>
      );
    // case "list-item":
    //   return (
    //     <li style={style} {...attributes}>
    //       {children}
    //     </li>
    //   );
    // case "numbered-list":
    //   return (
    //     <ol style={style} {...attributes}>
    //       {children}
    //     </ol>
    //   );
    default: {
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
