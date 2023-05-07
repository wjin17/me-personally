interface ExternalLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  noStyle?: boolean;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  className,
  noStyle,
  ...props
}) => {
  if (noStyle) {
    return (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        className={`rounded-full border-2 border-black px-2 py-2 shadow-brutal-black active:translate-x-[4px] active:translate-y-[4px] active:shadow-none dark:border-white dark:shadow-brutal-white dark:active:shadow-none ${
          className ?? ""
        }`}
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
      className={`rounded-lg border-2 border-black px-4 py-2 shadow-brutal-black active:translate-x-[4px] active:translate-y-[4px] active:shadow-none dark:border-white dark:shadow-brutal-white dark:active:shadow-none ${
        className ?? ""
      }`}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
