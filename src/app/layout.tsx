import "~/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { ReactNode } from "react";
import { Ubuntu } from "next/font/google";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Sample CMS",
  description: "An attempt at making a CMS",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const ubuntu = Ubuntu({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" data-bs-theme="dark">
      <body suppressHydrationWarning={true} className={ubuntu.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
