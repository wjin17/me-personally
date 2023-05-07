type TextInputProps = React.ComponentPropsWithoutRef<"input">;

const TextInput: React.FC<TextInputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props}
      className={`rounded-lg border-2 border-black bg-white px-4 py-2 shadow-brutal-black outline-none dark:border-white dark:bg-black dark:shadow-brutal-white ${
        className ?? ""
      }`}
    />
  );
};

export default TextInput;
