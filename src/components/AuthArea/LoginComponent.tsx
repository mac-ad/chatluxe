import LoginForm from "@/container/auth/LoginForm/LoginForm";
import React, { Dispatch, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormValidation } from "@/constants/auth";
import userService from "@/services/user/user.service";
import { toast } from "sonner";
import customToast from "@/utils/customToast";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { ApiError } from "next/dist/server/api-utils";

const LoginComponent = ({ setPage }: { setPage: Dispatch<string> }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const store = useGlobalStore((state: GlobalStoreState) => state);

  const { handleSubmit, formState, register, watch, setValue, trigger } =
    useForm({
      resolver: yupResolver(loginFormValidation),
    });

  const onSubmit = async () => {
    setLoading(true);
    const data = watch();
    try {
      const res = await userService.login({
        payload: data,
      });
      // log in in state store
      store.logUser(res.data);
      setLoading(false);
      customToast.success({
        content: res.message,
      });
    } catch (err: any) {
      setLoading(false);
      customToast.error({
        content: err.message,
      });
    }
  };

  const { errors } = formState;

  const formProps = {
    handleSubmit,
    onSubmit,
    register,
    setPage,
    loading,
    errors,
    setValue,
    trigger,
  };

  return (
    <div className="w-[90%] max-w-[500px]">
      <LoginForm {...formProps} />
    </div>
  );
};

export default LoginComponent;
