import "~/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { ReactNode } from "react";
import Header from "./_components/Header/page";
import { Ubuntu } from "next/font/google";

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
      <body className={ubuntu.className}>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
