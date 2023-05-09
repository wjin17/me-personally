import { type ReactElement } from "react";

import BaseLayout from "~/layouts/base";
import type { NextPageWithLayout } from "../../_app";
import BlogContentEditor from "~/components/editors/BlogEditor";
import { api } from "~/utils/api";

import Heading from "~/components/text/Heading";
import { useRouter } from "next/router";

const AdminBlogEditor: NextPageWithLayout = () => {
  const { query, isReady } = useRouter();
  const { data } = api.blogPosts.find.useQuery(
    { id: Number(query.blogId) },
    {
      enabled: isReady,
    }
  );
  if (!data) return null;
  return (
    <div className="mx-auto flex min-h-[calc(100vh-6rem)] flex-col overflow-x-clip px-6 pb-64">
      <Heading size="xl">Update blog post</Heading>
      <BlogContentEditor
        hidden={data.hidden}
        id={data.id}
        title={data.title}
        postedAt={data.postedAt}
        initialValue={data.contents}
      />
    </div>
  );
};

AdminBlogEditor.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default AdminBlogEditor;
