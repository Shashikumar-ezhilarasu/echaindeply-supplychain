import { useState, useCallback, useEffect } from "react";
import {
  AppConfig,
  UserSession,
  showConnect,
  UserData,
  openContractCall,
} from "@stacks/connect";

import {createNewProduct} from "@/lib/contract.js";
import { makeContractCall, PostConditionMode } from "@stacks/transactions";
import { STACKS_TESTNET } from "@stacks/network";


const appConfig = new AppConfig(["store_write"]);
const userSession = new UserSession({ appConfig });

const appDetails = {
  name: "Supply Chain Manufacturer Portal",
  icon: "https://freesvg.org/img/1541103084.png",
};

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

  type ProductObj = {
    productId: number;
    name: string;
    sku: string;
    gtin: string;
    ingredients: string;
    certifications: string;
    manufacturer: string;
    location: string;
    productionDate: number;
    expirationDate: number;
    batch?: string;
  };

  async function handleCreateNewProduct(productObj: ProductObj) {
    // Accepts a product object as argument
    if (typeof window === "undefined") return;
    try {
      if (!userData) throw new Error("User not connected");
      
      // Defensive: ensure all fields are defined and not undefined
      const safeProduct = {
        productId: productObj.productId ?? "",
        name: productObj.name ?? "",
        sku: productObj.sku ?? "",
        gtin: productObj.gtin ?? "",
        ingredients: productObj.ingredients ?? "",
        certifications: productObj.certifications ?? "",
        manufacturer: productObj.manufacturer ?? "",
        location: productObj.location ?? "",
        productionDate: productObj.productionDate ?? "",
        expirationDate: productObj.expirationDate ?? "",
        batch: productObj.batch ?? "",
      };

      // Convert dates to timestamps
      const prodTimestamp = safeProduct.productionDate ? 
        Math.floor(new Date(safeProduct.productionDate).getTime() / 1000) : 0;
      const expTimestamp = safeProduct.expirationDate ? 
        Math.floor(new Date(safeProduct.expirationDate).getTime() / 1000) : 0;

      const txOptions = await createNewProduct(
        safeProduct.productId,
        safeProduct.name,
        safeProduct.sku,
        safeProduct.gtin,
        safeProduct.ingredients,
        safeProduct.certifications,
        safeProduct.manufacturer,
        safeProduct.location,
        prodTimestamp,
        expTimestamp,
        safeProduct.batch  // Include batch parameter
      );
      
      if(!userData) throw new Error("User not connected");
      
      const result = await openContractCall({
        ...txOptions,
        network: STACKS_TESTNET,
        appDetails: {
          name: "Supply Chain Manufacturer Portal",
          icon: "https://freesvg.org/img/1541103084.png",
        },
        postConditionMode: PostConditionMode.Allow,
      });
      
      console.log('Transaction result:', result);
      window.alert("Product creation transaction sent successfully!");
      
    } catch (_err) {
      let message = 'Error creating product: ';
      if (_err instanceof Error) {
        message += _err.message;
        console.error('Error in handleCreateNewProduct:', _err);
      } else {
        message += 'Unknown error';
        console.error('Unknown error:', _err);
      }
      window.alert(message);
    }
  }

  return {
    userData,
    connectWallet,
    disconnectWallet,
    handleCreateNewProduct,
  };
}
