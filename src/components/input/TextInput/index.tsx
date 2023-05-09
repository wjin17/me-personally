import { forwardRef } from "react";

type TextInputProps = React.ComponentPropsWithoutRef<"input">;

const TextInput: React.FC<TextInputProps> = forwardRef<
  HTMLInputElement,
  TextInputProps
>(function TextInput(props, ref) {
  return (
    <input
      {...props}
      id={props.name}
      ref={ref}
      aria-label={props.name}
      className={`rounded-lg border-2 border-black bg-white px-4 py-2 shadow-brutal-black outline-none dark:border-white dark:bg-black dark:shadow-brutal-white ${
        props.className ?? ""
      }`}
    />
  );
});

export default TextInput;
