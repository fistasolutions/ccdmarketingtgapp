"use client";
import { validateTelegramWebAppData } from "@/utils/telegramAuth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useData } from "./ContextData";

interface UserDataType {
  loading: any;
  setCurrentUsers: any;
  currentUsers: any;
  fun: any;
  error: string | null;
}

const UserData = createContext<UserDataType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUsers, setCurrentUsers] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { users, spinData, setPointId } = useData();


  
  const fun = async () => {
    try {
      setLoading(true);
      const WebApp = (await import("@twa-dev/sdk")).default;
      WebApp.ready();
      const initData = WebApp.initData;
      WebApp.setHeaderColor("#101010");

      const validationResult = validateTelegramWebAppData(initData);
      const existingUser =
        users?.length > 0 &&
        users?.filter(
          (user: any) => user.telegram_id == validationResult.user.id
        );
      if (existingUser.length > 0) {
        setPointId(existingUser?.[0]?.user_id);
        setCurrentUsers(existingUser);
        return existingUser;
      }
      const userPayload = {
        username: validationResult.user.first_name,
        password_hash: "sdaasd",
        role: "user",
        status: null,
        user_points: 0,
        telegram_id: validationResult.user.id,
        image_url: validationResult.user.photo_url,
      };

      const userResponse = await fetch(
        "https://ccdtgminiapp-apis.vercel.app/api/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userPayload),
        }
      );
      const newUser = await userResponse.json();

      setPointId(newUser.user_id);
      setCurrentUsers(newUser);
      const response = await fetch(
        `https://ccdtgminiapp-apis.vercel.app/api/rewards`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.warn("No points found, returning an empty array."); // Set empty array if no points
        return;
      }

      const points = await response.json();
      const spinPayload = {
        user_id: newUser.user_id,
        spin_value: points?.[0]?.daily_spin_limit,
      };

      await fetch("https://ccdtgminiapp-apis.vercel.app/api/spin_counts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spinPayload),
      });
      setLoading(false);
      console.log("New user and spin count created successfully");
    } catch (error) {
      console.error("Error in creating or fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (users) {
      fun();
    }
  }, [users]);

  return (
    <UserData.Provider
      value={{ currentUsers, loading, error, fun, setCurrentUsers }}
    >
      {children}
    </UserData.Provider>
  );
};

export const useCurrentData = (): UserDataType => {
  const context = useContext(UserData);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
