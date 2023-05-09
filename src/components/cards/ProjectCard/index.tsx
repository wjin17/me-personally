import Image from "next/image";
import ExternalLink from "~/components/navigation/ExternalLink";
import Heading from "~/components/text/Heading";
import Paragraph from "~/components/text/Paragraph";
import type { Project } from "~/server/db/schema/projects";

type ProjectCardProps = {
  project: Optional<Project, "id">;
  disabled?: boolean;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, disabled }) => {
  return (
    <div className="flex flex-col rounded-lg border-2 border-black bg-white px-6 py-6 shadow-brutal-black dark:border-white dark:bg-black dark:shadow-brutal-white">
      <div className="relative mb-4 w-full pt-[52%]">
        {project.image && (
          <Image
            src={project.image}
            alt={project.description}
            fill
            className="left-0 top-0 h-full w-full rounded-lg object-cover"
          />
        )}
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <Heading size="md" bold>
            {project.title}
          </Heading>
          <Paragraph>{project.description}</Paragraph>
        </div>
        {!disabled && (
          <div className="flex justify-end gap-4">
            {project.demo && (
              <ExternalLink
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                Demo
              </ExternalLink>
            )}
            <ExternalLink
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              Repo
            </ExternalLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
