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
    <div className="flex items-center justify-center w-full flex-col gap-10 ">
      {/* <Switch
        defaultSelected
        size="sm"
        color="default"
        startContent={<Icon icon="solar:sun-2-bold" />}
        endContent={<Icon icon="tabler:moon-filled" />}
        className="mt-auto fixed right-3 top-4"
        onClick={() => toggleTheme()}
      /> */}

      {page === "login" && <LoginComponent setPage={setPage} />}
      {page === "register" && <RegisterComponent setPage={setPage} />}
      <h2 className="max-w-[50ch] text-center opacity-30">
        The first time register or login might take time since the backend is
        hosted in render.com (free teir) so its sleeping
      </h2>
    </div>
  );
};

export default AuthArea;
