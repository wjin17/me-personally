import { Element, Leaf } from "~/components/editors/TextEditor/Elements";
import type {
  CustomElement,
  CustomText,
} from "~/components/editors/TextEditor/slate-types";
import Paragraph from "~/components/text/Paragraph";

const leafAttribute = {
  "data-slate-leaf": true,
} as const;

const elementAttribute = {
  "data-slate-node": "element",
  ref: undefined,
} as const;

function isLeaf(node: CustomElement | CustomText): node is CustomText {
  return "text" in node;
}

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
      <Element attributes={elementAttribute} element={node}>
        {node.children.map((child, index) => (
          <RenderDescendant key={index} node={child} />
        ))}
      </Element>
    );
  }
};

function findDescription(node: CustomElement | CustomText) {
  if (!node) return null;
  if (isLeaf(node)) return null;
  if (node.type === "paragraph") return node;

  for (const child of node.children) {
    const foundNode = findDescription(child);
    if (foundNode) return node;
  }
}

export const RenderDescription: React.FC<DescendantProps> = ({ node }) => {
  if (!node) return null;
  const description = findDescription(node);

  if (!description) return null;

  return (
    <Paragraph className="line-clamp-3">
      {description.children.map((child, index) => (
        <RenderDescendant key={index} node={child} />
      ))}
    </Paragraph>
  );
};
