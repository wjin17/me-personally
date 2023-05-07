import { z } from "zod";
import ogs from "open-graph-scraper";

import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { projectSchema } from "~/server/validators/project.zod";
import { insertProjectsSchema, projects } from "~/server/db/schema/projects";

export const projectsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ links: z.string().array() }))
    .query(({ input }) => {
      //   const configs = input.links.map((link) => ({ url: link }));
      //   const openGraphData = [];
      //   for (const config of configs) {
      //     const { error, result } = await ogs(config);
      //     if (error) throw new Error("Could not get Open Graph Result");
      //     openGraphData.push(result);
      //   }
      //   console.log(openGraphData);
      return [];
    }),
  add: adminProcedure
    .input(insertProjectsSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const thing = await ctx.db.insert(projects).values(input);
        return input;
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
