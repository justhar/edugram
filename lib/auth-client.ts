import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

export async function login(
  username: string,
  password: string,
  school: string
) {
  try {
    const response = await fetch("/api/scrapper", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        school,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle response if necessary
    if (response.status !== 200) {
      return {
        error: "An error occurred",
      };
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      error: error.message || "An error occurred",
    };
  }
}

export async function signOutHandler() {
  await authClient.signOut();
}

export const { signIn, signUp, useSession, signOut } = createAuthClient();
