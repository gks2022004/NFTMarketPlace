import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "./components/footer/Footer";
import { WalletContextProvider } from "@/context/Wallet";
import { Header } from "./components/header/Header";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body className={inter.className}>
      <WalletContextProvider>
        <Header /> 
                    <main className="container mx-auto p-4">
                        {children}  
                    </main>
                    <Footer />
                    </WalletContextProvider> 
            </body>
    </html>
  );
}
