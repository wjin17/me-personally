import { type NextPage } from "next";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <h1>It me! {hello.data?.greeting}</h1>
    </>
  );
};

export default Home;
