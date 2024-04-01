import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import ReactQueryProvider from "@utils/ReactQueryProvider";
import { Suspense } from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";

export const metadata = {
  title: "Prompt AI",
  description: "Prompt AI - discover prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Provider>
        <body>
          <ReactQueryProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <div className="main">
              <div className="gradient" />
            </div>

            <main className="app">
              <Nav />
              <Suspense>{children}</Suspense>
            </main>
          </ReactQueryProvider>
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;
