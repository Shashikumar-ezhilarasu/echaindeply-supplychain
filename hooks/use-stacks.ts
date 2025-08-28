import { useState, useCallback, useEffect } from "react";
import {
  AppConfig,
  UserSession,
  showConnect,
  UserData,
} from "@stacks/connect";

const appConfig = new AppConfig(["store_write"]);
const userSession = new UserSession({ appConfig });

export function useStacks() {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  const connectWallet = useCallback(() => {
    showConnect({
      appDetails: {
        name: "Supply Chain Manufacturer Portal",
        icon: "https://freesvg.org/img/1541103084.png",
      },
      onFinish: () => window.location.reload(),
      userSession,
    });
  }, []);

  const disconnectWallet = useCallback(() => {
    userSession.signUserOut(window.location.origin);
  }, []);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData: UserData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData() as UserData);
    }
  }, []);

  return {
    userData,
    connectWallet,
    disconnectWallet,
  };
}
