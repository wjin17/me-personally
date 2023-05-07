import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const projects = pgTable("public.projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  image: text("image").notNull(),
});

export const insertProjectsSchema = createInsertSchema(projects).omit({
  id: true,
});

export type ProjectParams = z.infer<typeof insertProjectsSchema>;

export const selectProjectsSchema = createSelectSchema(projects);

export type Project = z.infer<typeof selectProjectsSchema>;
