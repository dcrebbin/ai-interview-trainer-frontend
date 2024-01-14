import Google from "@auth/core/providers/google";
import type { Provider } from "@auth/core/providers";
import { serverAuth$ } from '@builder.io/qwik-auth';

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } = serverAuth$(({ env }) => ({
  secret: env.get("AUTH_SECRET"),
  trustHost: true,
  callbacks: {
    signIn: async ({ account }: any) => {
      console.log("sign in", account);
      try {
        await fetch(`${process.env.VITE_API_URL}/api/auth/callback`, { headers: { Authorization: account.id_token, "x-api-key": env.get("API_KEY") ?? "" } });
      } catch (e) {
        console.error(e);
        return false;
      }
      return true;
    },
  },
  providers: [
    Google({
      clientId: env.get("GOOGLE_CLIENT_ID")!,
      clientSecret: env.get("GOOGLE_SECRET")!,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
  ] as Provider[],
}));
