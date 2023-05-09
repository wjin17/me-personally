import type { ReactElement } from "react";

import BlogCard from "~/components/cards/BlogCard";
import Heading from "~/components/text/Heading";
import AdminLayout from "~/layouts/admin";

import { api } from "~/utils/api";
import type { NextPageWithLayout } from "../../_app";

const AdminBlog: NextPageWithLayout = () => {
  const { data } = api.blogPosts.getAll.useQuery();
  return (
    <div className="mx-auto mb-16 flex min-h-[calc(100vh-6rem)] flex-col px-6 ">
      <Heading size="xl">Current posts</Heading>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        {data &&
          data.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              href={`/admin/blog/${post.id}`}
            />
          ))}
      </div>
    </div>
  );
};

AdminBlog.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminBlog;
