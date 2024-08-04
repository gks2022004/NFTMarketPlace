"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';

const Header = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    const connectWalletHandler = async () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                setConnButtonText('Wallet Connected');
            } catch (error) {
                console.error("User rejected the request or an error occurred.");
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this app.');
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                setWalletAddress(accounts[0]);
            });
        }
    }, []);

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
                            <Link href="/" className="hover:underline text-lg font-bold">
                                Marketplace
                            </Link>
                        </li>
                        <li>
                            <Link href="/list" className="hover:underline text-lg font-bold">
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
                        onClick={connectWalletHandler}
                        className="bg-purple-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : connButtonText}
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
