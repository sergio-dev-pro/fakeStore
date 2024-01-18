import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import StoreProvider from "../lib/globalState/StoreProvider";
import "@fortawesome/fontawesome-svg-core/styles.css";

// FontAwesome bug solution https://stackoverflow.com/questions/56334381/why-my-font-awesome-icons-are-being-displayed-big-at-first-and-then-updated-to-t
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fake store",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
