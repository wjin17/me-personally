import type { Descendant } from "slate";
import { Leaf, ViewElement } from "~/components/editors/TextEditor/Elements";
import type {
  CustomElement,
  CustomText,
} from "~/components/editors/TextEditor/slate-types";
import Paragraph from "~/components/text/Paragraph";
import { findDescription, isLeaf } from "./utils";

const leafAttribute = {
  "data-slate-leaf": true,
} as const;

const elementAttribute = {
  "data-slate-node": "element",
  ref: undefined,
} as const;

type DescendantProps = {
  node?: CustomElement | CustomText;
};

export const RenderDescendant: React.FC<DescendantProps> = ({ node }) => {
  if (!node) return null;
  if (isLeaf(node)) {
    return (
      <Leaf attributes={leafAttribute} leaf={node} text={node}>
        {node.text}
      </Leaf>
    );
  } else {
    return (
      <ViewElement attributes={elementAttribute} element={node}>
        {node.children.map((child, index) => (
          <RenderDescendant key={index} node={child} />
        ))}
      </ViewElement>
    );
  }
};

type DescriptionProps = {
  nodes?: Descendant[];
};

export const RenderDescription: React.FC<DescriptionProps> = ({ nodes }) => {
  if (!nodes) return null;
  const description = findDescription(nodes);

  if (!description) return null;

  return (
    <Paragraph className="line-clamp-3">
      {description.children.map((child, index) => (
        <RenderDescendant key={index} node={child} />
      ))}
    </Paragraph>
  );
};
