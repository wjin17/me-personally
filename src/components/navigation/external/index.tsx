interface ExternalLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  noStyle?: boolean;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  noStyle,
  ...props
}) => {
  if (noStyle) {
    return (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border-2 border-black p-2 shadow-brutal active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
      >
        {children}
      </a>
    );
  }

  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg border-2 border-black px-4 py-2 shadow-brutal active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
    >
      {children}
    </a>
  );
};

export default ExternalLink;
