import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { NextComponentType } from "next/types";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default MyApp;
