import { authFormPropsInterface } from "@/types/props/auth.types";
import Link from "next/link";

const RegisterForm = (props: authFormPropsInterface) => {
  const { handleSubmit, onSubmit, register } = props;

  return (
    <div>
      <h1>Register</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="username" {...register("username")} />
        <input type="text" placeholder="email" {...register("email")} />
        <button>register</button>
        <Link href="/auth/login">Login</Link>
      </form>
    </div>
  );
};

export default RegisterForm;
