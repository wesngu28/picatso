import { type AppType } from "next/app";
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default api.withTRPC(MyApp);
