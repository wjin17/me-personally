import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";
import { VscColorMode } from "react-icons/vsc";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ToggleDarkModeProps = React.ComponentPropsWithoutRef<"button">;

const ToggleDarkMode: React.FC<ToggleDarkModeProps> = ({ ...props }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = theme === "dark";

  if (!mounted) return <VscColorMode />;

  return (
    <button
      {...props}
      onClick={() => {
        if (isDarkMode) {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      }}
    >
      {isDarkMode ? (
        <BsFillSunFill size="1.75rem" />
      ) : (
        <BsMoonStarsFill size="1.75rem" />
      )}
    </button>
  );
};

export default ToggleDarkMode;
