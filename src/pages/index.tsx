import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";
import BaseLayout from "~/layouts/base";
import Heading from "~/components/text/Heading";
import Paragraph from "~/components/text/Paragraph";
import Image from "next/image";
import PageLink from "~/components/navigation/PageLink";

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-2xl flex-col justify-center px-6">
        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row">
          <div className="sm:w-1/2">
            <Heading size="lg" bold>
              Hi!
            </Heading>
            <Paragraph size="lg">
              My name is Willie Jin and I am a software engineer in the Bay
              Area. I currently work as a full stack engineer.
            </Paragraph>
            <PageLink href="#about" scroll={true}>
              About
            </PageLink>
          </div>
          <div className="mb-8 sm:mb-0 sm:w-1/2">
            <Image
              src="/static/pooio.png"
              alt="me"
              width="200"
              height="200"
              className="mx-auto"
            />
          </div>
        </div>
      </section>
      <section
        id="about"
        className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-2xl flex-col justify-center px-6"
      >
        <div>
          <Heading size="lg" bold>
            About me
          </Heading>
          <Paragraph size="lg">
            I&apos;m passionate about the web and love working with Typescript.
            Outside of tech you can catch me working out, reading, or playing
            video games with my friends.
          </Paragraph>
          <PageLink href="/projects">See projects</PageLink>
        </div>
      </section>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Home;
