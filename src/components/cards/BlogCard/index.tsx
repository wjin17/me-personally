import { format, parseISO } from "date-fns";
import Link from "next/link";
import { RenderDescription } from "~/components/editors/RenderDescendant";
import Heading from "~/components/text/Heading";
import Paragraph from "~/components/text/Paragraph";
import type { BlogPost } from "~/server/db/schema/blogPosts";

type BlogCardProps = {
  post: BlogPost;
  href: string;
};

const BlogCard: React.FC<BlogCardProps> = ({ post, href }) => {
  return (
    <Link
      href={href}
      className="flex h-full flex-col rounded-lg border-2 border-black bg-white px-6 py-6 shadow-brutal-black active:translate-x-[4px] active:translate-y-[4px] active:shadow-none dark:border-white dark:bg-black dark:shadow-brutal-white dark:active:shadow-none"
    >
      <div className="flex flex-col justify-between">
        <div>
          <Heading size="md" bold className="mb-0">
            {post.title}
          </Heading>
          <Paragraph>
            {format(parseISO(post.postedAt), "MMMM d, yyyy")}
          </Paragraph>
          <RenderDescription nodes={post.contents} />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
