import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";

import ActionButton from "~/components/button/ActionButton";
import TextInput from "~/components/input/TextInput.tsx";
import Heading from "~/components/text/Heading";

import BaseLayout from "~/layouts/base";

type SignInData = {
  password: string;
};

const AdminSignin = ({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { register, handleSubmit, getValues, setValue } = useForm<SignInData>();
  const router = useRouter();
  const { data, status } = useSession();

  if (status !== "loading" && data?.user.authed) void router.push("/admin");
  if (status === "loading") return null;

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();
    await signIn("credentials", { password: data.password });
  });
  return (
    <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-2xl flex-col items-center justify-center px-6">
      <Heading size="lg" bold className="mb-8">
        Enter Password
      </Heading>
      <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <TextInput
          {...(register("password"), { required: true })}
          className="mb-8"
          type="password"
          autoComplete="password"
          placeholder="Password"
          value={getValues("password")}
          onChange={(e) => {
            setValue("password", e.target.value);
          }}
        />
        <ActionButton type="submit">Sign in</ActionButton>
      </form>
    </div>
  );
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
