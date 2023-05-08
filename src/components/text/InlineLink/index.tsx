import { forwardRef } from "react";
import { FaUnlink } from "react-icons/fa";
import { type ReactEditor, useSelected, useSlate } from "slate-react";
import ActionButton from "~/components/buttons/ActionButton";
import { unwrapLink } from "~/components/editors/TextEditor/utils";
import ExternalLink from "~/components/navigation/ExternalLink";

const InlineChromiumBugfix = () => (
  <span contentEditable={false} style={{ fontSize: 0 }}>
    {String.fromCodePoint(160) /* Non-breaking space */}
  </span>
);

type InlineLinkProps = React.ComponentPropsWithoutRef<"a">;

const InlineLink: React.FC<InlineLinkProps> = forwardRef<
  HTMLAnchorElement,
  InlineLinkProps
>(function InlineLink({ href, className, children, ...props }, ref) {
  const editor = useSlate() as ReactEditor;
  const selected = useSelected();

  // experiment with position fixed for mobile
  return (
    <span className="relative inline">
      <a
        {...props}
        ref={ref}
        href={href}
        className={`relative underline ${
          selected ? "rounded-lg border-2 border-blue-500" : ""
        } ${className ?? ""}`}
      >
        <InlineChromiumBugfix />
        {children}
        <InlineChromiumBugfix />
      </a>
      {selected && (
        <span>
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
            <ExternalLink
              className="max-w-sm bg-white line-clamp-1 dark:bg-black"
              href={href}
            >
              {href}
            </ExternalLink>
          </span>
        </span>
      )}
    </span>
  );
});

export default InlineLink;
