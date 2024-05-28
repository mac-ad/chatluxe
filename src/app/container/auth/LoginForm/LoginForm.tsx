import { authFormPropsInterface } from "@/types/props/auth.types";
import Link from "next/link";

const LoginForm = (props: authFormPropsInterface) => {
  const { handleSubmit, onSubmit } = props;

  return (
    <div>
      <h1>Login </h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="username" />
        <button>login</button>
        <Link href="/auth/register">register now</Link>
      </form>
    </div>
  );
};

export default LoginForm;
