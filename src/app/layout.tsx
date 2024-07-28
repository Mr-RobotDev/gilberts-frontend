'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import useSessionTimeout from "@/hooks/useSessionTimeout";

const inter = Inter({ subsets: ["latin"] });

function SessionTimeoutComponent() {
  useSessionTimeout();
  return null;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>
          <Toaster position="top-right" />
          {children}
          <SessionTimeoutComponent />
        </body>
      </Provider>
    </html>
  );
}
