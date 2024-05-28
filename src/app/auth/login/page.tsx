"use client";

import LoginForm from "@/app/container/auth/LoginForm/LoginForm";
import { useForm } from "react-hook-form";

const index = () => {
  const { handleSubmit, formState, register } = useForm();

  const onSubmit = () => {};

  const formProps = {
    handleSubmit,
    onSubmit,
    register,
  };

  return (
    <div>
      <LoginForm {...formProps} />
    </div>
  );
};

export default index;
