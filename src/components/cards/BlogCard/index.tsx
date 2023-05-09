import { format, parseISO } from "date-fns";
import { RenderDescription } from "~/components/editors/RenderDescendant";
import Heading from "~/components/text/Heading";
import Paragraph from "~/components/text/Paragraph";
import type { BlogPost } from "~/server/db/schema/blogPosts";

type BlogCardProps = {
  post: BlogPost;
};

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="flex flex-col rounded-lg border-2 border-black bg-white px-6 py-6 shadow-brutal-black dark:border-white dark:bg-black dark:shadow-brutal-white">
      <div className="flex flex-col justify-between">
        <div>
          <Heading size="md" bold className="mb-0">
            {post.title}
          </Heading>
          <Paragraph>
            {format(parseISO(post.postedAt), "MMMM d, yyyy")}
          </Paragraph>
          <RenderDescription node={post.contents[0]} />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
