"use client";

import RegisterForm from "@/app/container/auth/RegisterForm/RegisterForm";
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
      <RegisterForm {...formProps} />
    </div>
  );
};

export default index;
