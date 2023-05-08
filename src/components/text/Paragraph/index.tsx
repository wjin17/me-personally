import { forwardRef } from "react";

const sizeMap = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl",
  xl: "text-4xl",
};

interface ParagraphProps extends React.ComponentPropsWithoutRef<"p"> {
  size?: keyof typeof sizeMap;
  bold?: boolean;
}

const Paragraph: React.FC<ParagraphProps> = forwardRef<
  HTMLParagraphElement,
  ParagraphProps
>(function Paragraph({ size, className, bold, children, ...props }, ref) {
  return (
    <p
      {...props}
      ref={ref}
      className={`mb-4 ${sizeMap[size ?? "md"]} font-7xl ${
        bold ? "font-bold" : ""
      } ${className ?? ""}`}
    >
      {children}
    </p>
  );
});

export default Paragraph;
