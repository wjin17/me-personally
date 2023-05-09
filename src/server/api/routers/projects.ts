import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import {
  insertProjectSchema,
  projects,
  updateProjectsSchema,
} from "~/server/db/schema/projects";

export const projectsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const foundProjects = await ctx.db
      .select()
      .from(projects)
      .orderBy(desc(projects.id));
    return foundProjects;
  }),
  add: adminProcedure
    .input(insertProjectSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const newProject = await ctx.db
          .insert(projects)
          .values(input)
          .returning();
        return newProject;
      } catch (err) {
        console.log(err);
      }
    }),
  update: adminProcedure
    .input(updateProjectsSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const updatedProject = await ctx.db
          .update(projects)
          .set(input)
          .where(eq(projects.id, input.id))
          .returning();
        return updatedProject;
      } catch (err) {
        console.log(err);
      }
    }),
  remove: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const updatedProject = await ctx.db
          .delete(projects)
          .where(eq(projects.id, input.id))
          .returning();
        return updatedProject;
      } catch (err) {
        console.log(err);
      }
    }),
  test: adminProcedure.query(() => {
    //   const configs = input.links.map((link) => ({ url: link }));
    //   const openGraphData = [];
    //   for (const config of configs) {
    //     const { error, result } = await ogs(config);
    //     if (error) throw new Error("Could not get Open Graph Result");
    //     openGraphData.push(result);
    //   }
    //   console.log(openGraphData);
    return "ayo";
  }),
});
