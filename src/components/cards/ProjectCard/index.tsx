import Image from "next/image";
import ExternalLink from "~/components/navigation/ExternalLink";
import Heading from "~/components/text/Heading";
import Paragraph from "~/components/text/Paragraph";
import type { Project } from "~/server/db/schema/projects";

// const data = {
//   twitterSite: "@github",
//   twitterCard: "summary_large_image",
//   twitterTitle: "GitHub - wjin17/Car-Simulation",
//   twitterDescription:
//     "Contribute to wjin17/Car-Simulation development by creating an account on GitHub.",
//   ogSiteName: "GitHub",
//   ogType: "object",
//   ogTitle: "GitHub - wjin17/Car-Simulation",
//   ogUrl: "https://github.com/wjin17/Car-Simulation",
//   ogDescription:
//     "Contribute to wjin17/Car-Simulation development by creating an account on GitHub.",
//   ogImage: {
//     height: "600",
//     type: null,
//     url: "https://opengraph.githubassets.com/96cb0f74f3a1cfbb9bd0ed8ee084212360b865cab07efb92ecb398ab4623c998/wjin17/Car-Simulation",
//     width: "1200",
//   },
//   twitterImage: {
//     alt: null,
//     height: null,
//     url: "https://opengraph.githubassets.com/96cb0f74f3a1cfbb9bd0ed8ee084212360b865cab07efb92ecb398ab4623c998/wjin17/Car-Simulation",
//     width: null,
//   },
//   ogLocale: "en",
//   favicon: "https://github.githubassets.com/favicons/favicon.svg",
//   charset: "utf-8",
//   requestUrl: "https://github.com/wjin17/Car-Simulation",
//   success: true,
// };

type ProjectCardProps = {
  project: Optional<Project, "id">;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <ExternalLink
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block px-6 py-6"
    >
      <div className="">
        <div className="relative mb-4 w-full pt-[52%]">
          <Image
            src={project.image}
            alt={project.description}
            fill
            className="left-0 top-0 h-full w-full rounded-lg object-cover"
          />
        </div>
        <Heading size="md" bold>
          {project.title}
        </Heading>
        <Paragraph>{project.description}</Paragraph>
      </div>
    </ExternalLink>
  );
};

export default ProjectCard;
