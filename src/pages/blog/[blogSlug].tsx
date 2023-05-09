import type { ReactElement } from "react";
import { format, parseISO } from "date-fns";

import type { NextPageWithLayout } from "../_app";
import BaseLayout from "~/layouts/base";
import { api } from "~/utils/api";
import { RenderDescendant } from "~/components/editors/RenderDescendant";
import Heading from "~/components/text/Heading";
import { useBlogSlug } from "~/hooks/useBlogSlug";
import Paragraph from "~/components/text/Paragraph";

const BlogPost: NextPageWithLayout = () => {
  const { slug, isReady } = useBlogSlug();
  const slugValid = Boolean(slug);
  const { data, error } = api.blogPosts.find.useQuery(
    { slug },
    {
      enabled: slugValid,
    }
  );

  if (!isReady) return null;

  if (!slugValid && isReady) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] flex-col px-6 pt-16">
        <Heading size="xl">No sneaky shit please ; )</Heading>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] flex-col px-6 pt-16">
        <Heading size="xl">Post not found</Heading>
      </div>
    );
  }

  if (data) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] flex-col px-6 pt-16">
        <Heading size="xl">{data.title}</Heading>
        <Paragraph>{format(parseISO(data.postedAt), "MMMM d, yyyy")}</Paragraph>
        {data.contents.map((section, index) => (
          <RenderDescendant key={index} node={section} />
        ))}
      </div>
    );
  }

  return null;
};

BlogPost.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default BlogPost;
