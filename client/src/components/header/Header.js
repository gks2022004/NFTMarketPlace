"use client";
import Link from 'next/link';
import { BrowserProvider } from 'ethers';
import { useContext, useState } from 'react';
import { WalletContext } from '@/context/Wallet';

export const Header = () => {
    const {
        isConnected,
        setIsConnected,
        userAddress,
        setUserAddress,
        signer,
        setSigner,
    } = useContext(WalletContext);
    const [mobileOpen, setMobileOpen] = useState(false);

    const connectWallet = async () =>{
        if(!window.ethereum){
            alert("Please install Metamask");
        }
        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            setSigner(signer);
            const account = await provider.send("eth_requestAccounts", []);
            setIsConnected(true);
            setUserAddress(account[0]);
            const network = await provider.getNetwork();
            const chainID = network.chainId;
            const sepoliaNetworkId = "11155111";
            if(chainID.toString() !== sepoliaNetworkId){
                alert("Please connect to Sepolia network");
                return;
            }  
        }   catch (error) {
            console.error("Connect Wallet Error: ",error);
       }
    };

    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 border-b border-gray-200">
                        <nav className="container-pro h-16 flex items-center">
                <div className="flex items-center gap-8 w-full">
                                        <div className="text-xl font-black tracking-tight text-gray-900 dark:text-gray-100">
                        <Link href="/">NFT Marketplace</Link>
                    </div>
                                        <ul className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <li>
                            <Link href="/marketplace" className="hover:text-gray-900">Marketplace</Link>
                        </li>
                        <li>
                            <Link href="/sellNFT" className="hover:text-gray-900">List</Link>
                        </li>
                        <li>
                            <Link href="/profile" className="hover:text-gray-900">Profile</Link>
                        </li>
                    </ul>
                                        <div className="ml-auto flex items-center gap-2">
                                                <button className="md:hidden btn-secondary px-3 py-2" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">≡</button>
                        <button
                            onClick={connectWallet}
                            className="btn-secondary"
                        >
                            {isConnected ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : "Connect Wallet"}
                        </button>
                    </div>
                </div>
            </nav>
                        {mobileOpen && (
                            <div className="md:hidden border-t border-gray-200 bg-white/90 dark:bg-gray-900/80 backdrop-blur">
                                <div className="container-pro py-3">
                                    <ul className="flex flex-col gap-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <li><Link href="/marketplace" onClick={() => setMobileOpen(false)}>Marketplace</Link></li>
                                        <li><Link href="/sellNFT" onClick={() => setMobileOpen(false)}>List</Link></li>
                                        <li><Link href="/profile" onClick={() => setMobileOpen(false)}>Profile</Link></li>
                                    </ul>
                                </div>
                            </div>
                        )}
        </header>
    );
};
