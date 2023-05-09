import type { InferModel } from "drizzle-orm";
import {
  boolean,
  date,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { type Descendant } from "slate";
import { z } from "zod";

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug"),
  contents: jsonb("contents").$type<Descendant[]>().notNull(),
  hidden: boolean("hidden").notNull(),
  postedAt: date("posted_at").notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type BlogPost = InferModel<typeof blogPosts>;

export const insertBlogPostSchema = createInsertSchema(blogPosts, {
  contents: () => z.custom<Descendant[]>(),
}).omit({
  id: true,
  slug: true,
  updated_at: true,
  //  contents: true,
});
//.extend({ contents: jsonSchema.array() });

export type InsertBlogPostParams = z.infer<typeof insertBlogPostSchema>;

export const selectBlogPostsSchema = createSelectSchema(blogPosts);

export const searchBlogPostsSchema = selectBlogPostsSchema
  .pick({
    id: true,
    slug: true,
  })
  .partial()
  .and(
    z.union(
      [
        z.object({ id: z.undefined(), slug: z.string() }),
        z.object({ id: z.number(), slug: z.undefined() }),
      ],
      { errorMap: () => ({ message: "Either id or slug must be filled in" }) }
    )
  );

export const updateBlogPostSchema = createSelectSchema(blogPosts);

export type UpdateBlogPostParams = z.infer<typeof updateBlogPostSchema>;
