import { TRPCError } from "@trpc/server";
import { desc, eq, type SQL } from "drizzle-orm";
import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import {
  blogPosts,
  insertBlogPostSchema,
  searchBlogPostsSchema,
  updateBlogPostSchema,
} from "~/server/db/schema/blogPosts";

export const blogPostsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    let filter: SQL | undefined = eq(blogPosts.hidden, false);
    if (ctx.session?.user.authed) filter = undefined;
    const foundPosts = await ctx.db
      .select()
      .from(blogPosts)
      .where(filter)
      .orderBy(desc(blogPosts.postedAt));
    return foundPosts;
  }),
  find: publicProcedure
    .input(searchBlogPostsSchema)
    .query(async ({ input, ctx }) => {
      try {
        let query: SQL | undefined = undefined;
        if (input.slug) query = eq(blogPosts.slug, input.slug);
        if (input.id) query = eq(blogPosts.id, input.id); // prioritize id
        const foundPost = await ctx.db.select().from(blogPosts).where(query);
        if (!foundPost[0]) {
          throw new TRPCError({
            code: "NOT_FOUND",
          });
        }
        return foundPost[0];
      } catch (err) {
        throw err;
      }
    }),
  add: adminProcedure
    .input(insertBlogPostSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const newProject = await ctx.db
          .insert(blogPosts)
          .values({ ...input })
          .returning();
        return newProject;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }),
  update: adminProcedure
    .input(updateBlogPostSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const updatedPost = await ctx.db
          .update(blogPosts)
          .set(input)
          .where(eq(blogPosts.id, input.id))
          .returning();
        return updatedPost;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }),
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const deletedPost = await ctx.db
          .delete(blogPosts)
          .where(eq(blogPosts.id, input.id))
          .returning();
        return deletedPost;
      } catch (err) {
        console.log(err);
      }
    }),
  //   update: adminProcedure
  //     .input(updateProjectsSchema)
  //     .mutation(async ({ input, ctx }) => {
  //       try {
  //         const updatedProject = await ctx.db
  //           .update(projects)
  //           .set(input)
  //           .where(eq(projects.id, input.id))
  //           .returning();
  //         return updatedProject;
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }),
  //   remove: adminProcedure
  //     .input(z.object({ id: z.number() }))
  //     .mutation(async ({ input, ctx }) => {
  //       try {
  //         const updatedProject = await ctx.db
  //           .delete(projects)
  //           .where(eq(projects.id, input.id))
  //           .returning();
  //         return updatedProject;
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }),
  //   test: adminProcedure.query(() => {
  //     //   const configs = input.links.map((link) => ({ url: link }));
  //     //   const openGraphData = [];
  //     //   for (const config of configs) {
  //     //     const { error, result } = await ogs(config);
  //     //     if (error) throw new Error("Could not get Open Graph Result");
  //     //     openGraphData.push(result);
  //     //   }
  //     //   console.log(openGraphData);
  //     return "ayo";
  //   }),
});
