import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";
import BaseLayout from "~/layouts/base";
import Heading from "~/components/text/Heading";
import OpenGraphCard from "~/components/cards/OpenGraphCard";
//import { api } from "~/utils/api";

const data = [
  {
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
  },
  {
    twitterSite: "@github",
    twitterCard: "summary_large_image",
    twitterTitle: "GitHub - wjin17/battleship: Simple playable battleship game",
    twitterDescription:
      "Simple playable battleship game. Contribute to wjin17/battleship development by creating an account on GitHub.",
    ogSiteName: "GitHub",
    ogType: "object",
    ogTitle: "GitHub - wjin17/battleship: Simple playable battleship game",
    ogUrl: "https://github.com/wjin17/battleship",
    ogDescription:
      "Simple playable battleship game. Contribute to wjin17/battleship development by creating an account on GitHub.",
    ogImage: {
      height: "600",
      type: null,
      url: "https://opengraph.githubassets.com/3283359ad67f2c247c9e7296295ab0a522ce49873dda95e1a11e186d1b378fcf/wjin17/battleship",
      width: "1200",
    },
    twitterImage: {
      alt: null,
      height: null,
      url: "https://opengraph.githubassets.com/3283359ad67f2c247c9e7296295ab0a522ce49873dda95e1a11e186d1b378fcf/wjin17/battleship",
      width: null,
    },
    ogLocale: "en",
    favicon: "https://github.githubassets.com/favicons/favicon.svg",
    charset: "utf-8",
    requestUrl: "https://github.com/wjin17/battleship",
    success: true,
  },
];

const Projects: NextPageWithLayout = () => {
  //const { data } = api.projects.openGraphData.useQuery({ links: projects });
  //console.log(data);
  return (
    <div>
      <section className="mx-auto min-h-[calc(100vh-6rem)] px-6">
        <Heading size="lg" bold>
          Featured projects
        </Heading>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          <OpenGraphCard />
          <OpenGraphCard />
          <OpenGraphCard />
          <OpenGraphCard />
          <OpenGraphCard />
          <OpenGraphCard />
        </div>
      </section>
    </div>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Projects;
