import { type AppType } from "next/app";
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Script from "next/script";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js"  />
      <noscript>{/* eslint-disable @next/next/no-img-element */}
        <img
          src="https://queue.simpleanalyticscdn.com/noscript.gif"
          alt=""
          referrerPolicy="no-referrer-when-downgrade"
        />
      </noscript>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default api.withTRPC(MyApp);
