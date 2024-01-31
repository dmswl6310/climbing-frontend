import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { NextComponentType } from "next/types";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Layout>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Layout>
  );
};

export default MyApp;
