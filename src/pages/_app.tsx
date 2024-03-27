import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { NextComponentType, NextPage } from "next/types";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<PageTransitionEvent, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: NextComponentType<AppContext, AppInitialProps, AppPropsWithLayout> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const getLayout = Component.getLayout ?? ((page: any) => <Layout>{page}</Layout>);
  return (
    <SessionProvider session={session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>
  );
};

export default MyApp;
