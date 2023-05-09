import type { InferModel } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  github: text("github_url").notNull(),
  demo: text("demo_url"),
  image: text("image").notNull(),
});

export type Project = InferModel<typeof projects>;

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export type InsertProjectParams = z.infer<typeof insertProjectSchema>;

export const selectProjectsSchema = createSelectSchema(projects);

export const updateProjectsSchema = createSelectSchema(projects);

export type UpdateProjectParams = z.infer<typeof updateProjectsSchema>;
