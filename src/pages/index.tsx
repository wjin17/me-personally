import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";
import BaseLayout from "~/layouts/base";
import { api } from "~/utils/api";

const Home: NextPageWithLayout = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <h1>It me! {hello.data?.greeting}</h1>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Home;
