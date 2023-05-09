import type { ReactElement } from "react";

import type { NextPageWithLayout } from "../_app";
import BaseLayout from "~/layouts/base";
import { api } from "~/utils/api";
import BlogCard from "~/components/cards/BlogCard";
import Heading from "~/components/text/Heading";
import Link from "next/link";

const Blog: NextPageWithLayout = () => {
  const { data } = api.blogPosts.getAll.useQuery();
  return (
    <div className="mx-auto mb-16 flex min-h-[calc(100vh-6rem)] flex-col px-6 ">
      <Heading size="xl">
        The inner machinations of my mind are an enigma
      </Heading>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        {data &&
          data.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              href={`/blog/${post.slug ?? ""}`}
            />
          ))}
      </div>
    </div>
  );
};

Blog.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Blog;
