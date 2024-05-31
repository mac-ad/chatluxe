import MyInput from "@/components/MyInput/MyInput";
import { authFormPropsInterface } from "@/types/props/auth.types";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/react";

const RegisterForm = (props: authFormPropsInterface) => {
  const {
    handleSubmit,
    onSubmit,
    register,
    setPage,
    loading,
    errors,
    setValue,
    trigger,
  } = props;

  return (
    <div className=" flex flex-col gap-2 w-full">
      <h1 className="text-2xl font-bold mb-5">Register</h1>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <MyInput
          errors={errors}
          type="text"
          label="Username"
          placeholder=""
          disabled={loading}
          name="username"
          setValue={setValue}
          trigger={trigger}
        />
        <MyInput
          errors={errors}
          type="text"
          label="Email"
          placeholder=""
          disabled={loading}
          name="email"
          setValue={setValue}
          trigger={trigger}
          className="mb-10"
        />

        <Button
          type="submit"
          radius="sm"
          size="lg"
          className="font-bold text-md"
          isLoading={loading}
        >
          {loading ? "Registering" : "Register"}
        </Button>
        <span className="flex items-center gap-2 text-sm opacity-80 justify-center lock ">
          Already have an account?
          <Link href="#" onClick={() => setPage("login")}>
            Login now
          </Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterForm;
