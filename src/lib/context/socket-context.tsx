import { GlobalStoreState, useGlobalStore } from "@/store/store";
import React, { createContext, useContext, useEffect, useState } from "react";
import socketio from "socket.io-client";

interface ISocketContext {
  socket: ReturnType<typeof socketio> | null;
}

export const useSocket = () => useContext(SocketContext);

export const SocketContext = createContext<ISocketContext>({
  socket: null,
});

const getSocket = (accessToken: string | null) => {
  if (!accessToken) return null;
  return socketio(process.env.NEXT_PUBLIC_BASE_URL!, {
    withCredentials: true,
    auth: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, accessToken } = useGlobalStore(
    (state: GlobalStoreState) => state
  );

  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null
  );

  useEffect(() => {
    if (user && accessToken) {
      setSocket(getSocket(accessToken));
    }
  }, [user, accessToken]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
