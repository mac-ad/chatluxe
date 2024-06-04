import { useState } from "react";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import { Switch } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { GlobalStoreState, useGlobalStore } from "@/store/store";

const AuthArea = () => {
  const [page, setPage] = useState<string>("login");

  const toggleTheme = useGlobalStore(
    (state: GlobalStoreState) => state.toggleTheme
  );

  return (
    <div className="flex items-center justify-center w-full  ">
      <Switch
        defaultSelected
        size="sm"
        color="default"
        startContent={<Icon icon="solar:sun-2-bold" />}
        endContent={<Icon icon="tabler:moon-filled" />}
        className="mt-auto fixed right-3 top-4"
        onClick={() => toggleTheme()}
      />
      {page === "login" && <LoginComponent setPage={setPage} />}
      {page === "register" && <RegisterComponent setPage={setPage} />}
    </div>
  );
};

export default AuthArea;
