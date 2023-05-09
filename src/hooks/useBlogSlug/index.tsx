import { useRouter } from "next/router";
import { useMemo } from "react";
import { z } from "zod";

export const useBlogSlug = () => {
  const { asPath, isReady } = useRouter();

  const value = useMemo(() => {
    const slug = asPath.split("/")[2];

    if (!slug) return "";
    const validatedSlug = z
      .string()
      .regex(new RegExp(/^[a-zA-Z0-9\-]+$/))
      .safeParse(slug);
    if (!validatedSlug.success) return "";

    return validatedSlug.data;
  }, [asPath]);

  return { slug: value, isReady };
};
