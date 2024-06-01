import MyInput from "@/components/MyInput/MyInput";
import { GlobalStoreState, useGlobalStore } from "@/store/store";
import { authFormPropsInterface } from "@/types/props/auth.types";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/react";

const LoginForm = (props: authFormPropsInterface) => {
  const {
    handleSubmit,
    onSubmit,
    setPage,
    loading,
    errors,
    setValue,
    trigger,
  } = props;

  return (
    <div className=" flex flex-col gap-2 w-full">
      <h1 className="text-2xl font-bold mb-5">Login</h1>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <MyInput
          type="text"
          label="Username"
          placeholder=""
          name="username"
          disabled={loading}
          errors={errors}
          setValue={setValue}
          trigger={trigger}
        />
        <Button
          type="submit"
          radius="sm"
          size="lg"
          className="font-bold text-md"
          isLoading={loading}
        >
          {loading ? "Logging in" : "Login"}
        </Button>
        <span className="flex items-center gap-2 text-sm opacity-80 justify-center lock ">
          Dont have an account?
          <Link href="#" onClick={() => setPage("register")}>
            register now
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
