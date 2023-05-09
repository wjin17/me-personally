import { forwardRef } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

type ToggleProps = React.ComponentPropsWithoutRef<"input">;

const ToggleSwitch: React.FC<ToggleProps> = forwardRef<
  HTMLInputElement,
  ToggleProps
>(function TextInput(props, ref) {
  return (
    <label htmlFor={props.name} className="relative h-8 w-14 cursor-pointer">
      <input
        {...props}
        id={props.name}
        ref={ref}
        aria-label={props.name}
        type="checkbox"
        className={`peer sr-only ${props.checked ? "block" : "hidden"} ${
          props.className ?? ""
        }`}
      />
      <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-black transition-all peer-checked:start-6 dark:border-white">
        {props.checked ? <BsEyeSlash size={16} /> : <BsEye size={16} />}
      </span>
      <span className="absolute inset-0 rounded-full border-2 border-black transition dark:border-white" />
    </label>
  );
});

export default ToggleSwitch;
