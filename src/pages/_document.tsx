import { Html, Head, Main, NextScript } from "next/document";
import { useDarkMode } from "usehooks-ts";

const Document = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <Html className={`${isDarkMode ? "dark" : ""}`}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
