import type { Descendant } from "slate";
import type {
  CustomElement,
  CustomText,
  ParagraphElement,
} from "~/components/editors/TextEditor/slate-types";

export function isLeaf(node: CustomElement | CustomText): node is CustomText {
  return "text" in node;
}

function validNodeDFS(node: CustomElement | CustomText) {
  if (!node) return false;
  if (isLeaf(node)) return Boolean(node.text);

  for (const child of node.children) {
    const isValid = validNodeDFS(child);
    if (isValid) return true;
  }
  return false;
}

function descriptionDFS(
  node: CustomElement | CustomText
): ParagraphElement | null {
  if (!node) return null;
  if (isLeaf(node)) return null;
  if (node.type === "paragraph") {
    if (validNodeDFS(node)) {
      return node;
    } else {
      return null;
    }
  }

  for (const child of node.children) {
    const foundNode = descriptionDFS(child);
    if (foundNode) return foundNode;
  }

  return null;
}

export function findDescription(nodes: Descendant[]) {
  for (const child of nodes) {
    const foundNode = descriptionDFS(child);
    if (foundNode && !isLeaf(child)) return foundNode;
  }
  return null;
}
