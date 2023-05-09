import { TRPCError } from "@trpc/server";
import { asc, eq, type SQL } from "drizzle-orm";
import { CustomElement } from "~/components/editors/TextEditor/slate-types";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import {
  blogPosts,
  insertBlogPostSchema,
  searchBlogPostsSchema,
} from "~/server/db/schema/blogPosts";

export const blogPostsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const foundPosts = await ctx.db
      .select()
      .from(blogPosts)
      .orderBy(asc(blogPosts.postedAt));
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
