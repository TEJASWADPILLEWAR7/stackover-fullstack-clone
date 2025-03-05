import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware/persist";

import { AppwriteException, ID, Models } from "node-appwrite";
import { account } from "@/models/client/config";

export interface UsePrefs {
  reputation: number;
}

interface IAuthStore {
  session: Models.Session | null;
  jwt: string | null;
  user: Models.User<UsePrefs> | null;
  hydrated: Boolean;

  setHydrated(): void;
  verifySession(): Promise<void>;
  login(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  createAccount(
    name: string,
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  logout(): Promise<void>;
}


export const userAuthStore = create<IAuthStore>(){
    persist(
        immer(
            
        )
    )
}