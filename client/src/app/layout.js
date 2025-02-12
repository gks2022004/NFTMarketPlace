import { Inter } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/context/Wallet";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/Footer";

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
