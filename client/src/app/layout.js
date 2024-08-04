import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header/header";
import { WalletProvider } from "@/context/Wallet";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body className={inter.className}>
        <WalletProvider>
                    <Header />
                    <main className="container mx-auto p-4">
                        {children}
                    </main>
                    </WalletProvider>
            </body>
    </html>
  );
}
