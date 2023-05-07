import { z } from "zod";
import ogs from "open-graph-scraper";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const projectsRouter = createTRPCRouter({
  openGraphData: publicProcedure
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
      return [
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
          twitterTitle:
            "GitHub - wjin17/battleship: Simple playable battleship game",
          twitterDescription:
            "Simple playable battleship game. Contribute to wjin17/battleship development by creating an account on GitHub.",
          ogSiteName: "GitHub",
          ogType: "object",
          ogTitle:
            "GitHub - wjin17/battleship: Simple playable battleship game",
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
    }),
});
