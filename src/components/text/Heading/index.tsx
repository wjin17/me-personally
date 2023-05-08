import { forwardRef } from "react";

const sizeMap = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-5xl",
  xl: "text-7xl",
};

interface HeadingProps extends React.ComponentPropsWithoutRef<"h1"> {
  size?: keyof typeof sizeMap;
  bold?: boolean;
}

const Heading: React.FC<HeadingProps> = forwardRef<
  HTMLHeadingElement,
  HeadingProps
>(function Heading({ children, size, bold, className, ...props }, ref) {
  return (
    <h1
      {...props}
      ref={ref}
      className={`mb-4 ${sizeMap[size ?? "sm"]} ${bold ? "font-bold" : ""} ${
        className ?? ""
      }`}
    >
      {children}
    </h1>
  );
});

export default Heading;
