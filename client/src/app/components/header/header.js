"use client";
import Link from 'next/link';
import { BrowserProvider } from 'ethers';
import { useContext } from 'react';
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
        <header className="p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link href="/">
                        NFT Marketplace
                    </Link>
                </div>
                <div className="flex-grow">
                    <ul className="flex justify-center space-x-8">
                        <li>
                            <Link href="/marketplace" className="hover:underline text-lg font-bold">
                                Marketplace
                            </Link>
                        </li>
                        <li>
                            <Link href="/sellNFT" className="hover:underline text-lg font-bold">
                                List
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile" className="hover:underline text-lg font-bold">
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <button
                        onClick={connectWallet}
                        className="bg-purple-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {isConnected ? `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : "Connect Wallet"}
                    </button>
                </div>
            </nav>
        </header>
    );
};

