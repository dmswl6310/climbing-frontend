import Layout from "@/components/Layout";
import { ChatHistoryProvider } from "@/ChatHistoryContext";
import { SessionProvider } from "next-auth/react";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import { NextComponentType, NextPage } from "next/types";
import { ReactElement, ReactNode } from "react";
import { NavContextProvider } from "@/NavContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<PageTransitionEvent, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

const MyApp: NextComponentType<AppContext, AppInitialProps, AppPropsWithLayout> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const getLayout = Component.getLayout ?? ((page: any) => <Layout>{page}</Layout>);
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <NavContextProvider>
          <ChatHistoryProvider>{getLayout(<Component {...pageProps} />)}</ChatHistoryProvider>
        </NavContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
