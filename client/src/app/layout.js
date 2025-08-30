import { Inter } from "next/font/google";
import "./globals.css";
import { WalletContextProvider } from "@/context/Wallet";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body className={`${inter.className} min-h-screen flex flex-col`}>
        <WalletContextProvider>
          <Header />
          <main className="flex-1 py-8">
            <div className="container-pro">
              {children}
            </div>
          </main>
          <Footer />
          <Toaster position="top-right" toastOptions={{
            duration: 4000,
            style: { background: '#111827', color: '#fff' },
            success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
          }} />
        </WalletContextProvider>
      </body>
    </html>
  );
}
