type ActionButtonProps = React.ComponentPropsWithoutRef<"button">;

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`rounded-lg border-2 border-black px-4 py-2 shadow-brutal-black active:translate-x-[4px] active:translate-y-[4px] active:shadow-none dark:border-white dark:shadow-brutal-white dark:active:shadow-none ${
        className ?? ""
      }`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
