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

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  size,
  bold,
  className,
  ...props
}) => {
  return (
    <p
      {...props}
      className={`mb-4 ${sizeMap[size ?? "md"]} font-7xl ${
        bold ? "font-bold" : ""
      } ${className ?? ""}`}
    >
      {children}
    </p>
  );
};

export default Paragraph;
