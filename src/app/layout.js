import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "./dashboard/_components/Header";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PrepMind",
  description:
    "PrepMind is a platform that helps you to prepare for your job interview.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js"
            async
          ></script>
        </Head>
        <body className={inter.className}>
          <Toaster />
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
