"use client";
import { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [signer, setSigner] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                setWalletAddress(accounts[0]);
                setIsConnected(accounts.length > 0);
                if (accounts.length > 0) {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    setSigner(provider.getSigner());
                } else {
                    setSigner(null);
                }
            });
        }
    }, []);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                setIsConnected(true);
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setSigner(provider.getSigner());
            } catch (error) {
                console.error("User rejected the request.");
            }
        } else {
            alert("MetaMask is not installed. Please install it to use this app.");
        }
    };

    return (
        <WalletContext.Provider value={{ walletAddress, connectWallet, isConnected, signer }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);
