import { RegisterFormValidation } from "@/constants/auth";
import RegisterForm from "@/container/auth/RegisterForm/RegisterForm";
import userService from "@/services/user/user.service";
import customToast from "@/utils/customToast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, useState } from "react";
import { useForm } from "react-hook-form";

const RegisterComponent = ({ setPage }: { setPage: Dispatch<string> }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { handleSubmit, register, formState, setValue, trigger, watch } =
    useForm({
      resolver: yupResolver(RegisterFormValidation),
    });

  const onSubmit = async () => {
    const data = watch();
    setLoading(true);

    try {
      const res = await userService.register({
        payload: data,
      });
      setPage("login");
      customToast.success({
        content: res.message,
      });
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      customToast.error({
        content: err.message,
      });
      setLoading(false);
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
      <RegisterForm {...formProps} />
    </div>
  );
};

export default RegisterComponent;
