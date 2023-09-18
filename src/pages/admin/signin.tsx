import type { ReactElement } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";

import ActionButton from "~/components/buttons/ActionButton";
import TextInput from "~/components/input/TextInput";
import Heading from "~/components/text/Heading";

import BaseLayout from "~/layouts/base";

type SignInData = {
  username: string;
  password: string;
};

const AdminSignin = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { register, handleSubmit } = useForm<SignInData>();
  const router = useRouter();
  const { data, status } = useSession();

  if (status !== "loading" && data?.user.authed) void router.push("/admin");
  if (status === "loading") return null;

  const onSubmit: SubmitHandler<SignInData> = async (
    { username, password },
    e
  ) => {
    e?.preventDefault();
    await signIn("credentials", {
      username,
      password,
    });
  };

  //console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-2xl flex-col items-center justify-center px-6">
      <Heading size="lg" bold className="mb-8">
        Enter Password
      </Heading>
      <form
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
        className="flex flex-col"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <TextInput
          className="mb-8"
          type="text"
          autoComplete="username"
          placeholder="Username"
          {...register("username", { required: true })}
        />
        <TextInput
          className="mb-8"
          type="password"
          autoComplete="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <ActionButton type="submit">Sign in</ActionButton>
      </form>
    </div>
  );

  // console.log("username", watch("username"));
  // console.log("password", watch("password"));
};

AdminSignin.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default AdminSignin;
