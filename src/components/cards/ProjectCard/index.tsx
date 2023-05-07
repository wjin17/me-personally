import Image from "next/image";
import ExternalLink from "~/components/navigation/ExternalLink";
import Heading from "~/components/text/Heading";
import Paragraph from "~/components/text/Paragraph";

const data = {
  twitterSite: "@github",
  twitterCard: "summary_large_image",
  twitterTitle: "GitHub - wjin17/Car-Simulation",
  twitterDescription:
    "Contribute to wjin17/Car-Simulation development by creating an account on GitHub.",
  ogSiteName: "GitHub",
  ogType: "object",
  ogTitle: "GitHub - wjin17/Car-Simulation",
  ogUrl: "https://github.com/wjin17/Car-Simulation",
  ogDescription:
    "Contribute to wjin17/Car-Simulation development by creating an account on GitHub.",
  ogImage: {
    height: "600",
    type: null,
    url: "https://opengraph.githubassets.com/96cb0f74f3a1cfbb9bd0ed8ee084212360b865cab07efb92ecb398ab4623c998/wjin17/Car-Simulation",
    width: "1200",
  },
  twitterImage: {
    alt: null,
    height: null,
    url: "https://opengraph.githubassets.com/96cb0f74f3a1cfbb9bd0ed8ee084212360b865cab07efb92ecb398ab4623c998/wjin17/Car-Simulation",
    width: null,
  },
  ogLocale: "en",
  favicon: "https://github.githubassets.com/favicons/favicon.svg",
  charset: "utf-8",
  requestUrl: "https://github.com/wjin17/Car-Simulation",
  success: true,
};

const ProjectCard: React.FC = () => {
  return (
    <ExternalLink
      href={data.ogUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block px-6 py-6"
    >
      <div className="">
        <div className="relative w-full pt-[52%]">
          <Image
            src={
              "https://raw.githubusercontent.com/wjin17/Car-Simulation/master/assets/car-demo.gif"
            }
            alt={data.ogDescription}
            fill
            className="left-0 top-0 h-full w-full rounded-lg object-cover"
          />
        </div>
        <Heading size="md" bold>
          {data.ogTitle}
        </Heading>
        <Paragraph>{data.ogDescription}</Paragraph>
      </div>
    </ExternalLink>
  );
};

export default ProjectCard;
