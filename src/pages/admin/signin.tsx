import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import ActionButton from "~/components/button/ActionButton";
import TextInput from "~/components/input/TextInput.tsx";
import Heading from "~/components/text/Heading";

import AdminLayout from "~/layouts/admin";
import type { NextPageWithLayout } from "../_app";

type SignInData = {
  password: string;
};

const Admin: NextPageWithLayout = () => {
  const { register, handleSubmit } = useForm<SignInData>();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-2xl flex-col items-center justify-center px-6">
      <Heading size="lg" bold className="mb-8">
        Enter Password
      </Heading>
      <form onSubmit={() => void onSubmit()} className="flex flex-col">
        <TextInput
          {...(register("password"), { required: true })}
          className="mb-8"
          type="password"
          autoComplete="password"
          placeholder="Password"
        />
        <ActionButton type="submit">Sign in</ActionButton>
      </form>
    </div>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Admin;
