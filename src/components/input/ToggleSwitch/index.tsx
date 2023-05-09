import { forwardRef } from "react";

type ToggleProps = React.ComponentPropsWithoutRef<"input">;

const ToggleSwitch: React.FC<ToggleProps> = forwardRef<
  HTMLInputElement,
  ToggleProps
>(function TextInput(props, ref) {
  return (
    <label className="flex cursor-pointer select-none items-center">
      <div className="relative">
        <input
          {...props}
          id={props.name}
          ref={ref}
          aria-label={props.name}
          type="checkbox"
          className={`sr-only w-full rounded-lg border-2 border-black bg-white px-4 py-2 shadow-brutal-black outline-none dark:border-white dark:bg-black dark:shadow-brutal-white ${
            props.className ?? ""
          }`}
        />
      </div>
      <div className="block h-8 w-14 rounded-full bg-[#E5E7EB]"></div>
      <div className="dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition"></div>
    </label>
  );
});

export default ToggleSwitch;

{
  /* <label for="toggleTwo" class="flex cursor-pointer select-none items-center">
  <div class="relative">
    <input type="checkbox" id="toggleTwo" class="sr-only" />
    <div class="block h-8 w-14 rounded-full bg-[#E5E7EB]"></div>
    <div
      class="dot absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition"
    ></div>
  </div>
</label> */
}
