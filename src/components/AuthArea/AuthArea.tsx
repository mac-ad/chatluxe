import { useState } from "react";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";

const AuthArea = () => {
  const [page, setPage] = useState<string>("login");

  return (
    <div className="flex items-center justify-center w-full">
      {page === "login" && <LoginComponent setPage={setPage} />}
      {page === "register" && <RegisterComponent setPage={setPage} />}
    </div>
  );
};

export default AuthArea;
