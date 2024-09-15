"use client";
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { WalletContext } from '@/context/Wallet';
import { uploadFileToIPFS, uploadJSONToIPFS } from '../pinata';
import  marketplace  from '../marketplace.json';
//import { Footer } from '../components/footer/Footer';
//import Header from '../components/header/Header';

export default function SellNFT(){
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: '' });
    const [fileURL, setFileURL] = useState();
    const [message, updateMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isListing, setIsListing] = useState(false);
    const [btn, setBtn] = useState(false);
    const [btnContent, setBtnContent] = useState('List NFT');
    const router = useRouter();
    const { isConnected, signer } = useContext(WalletContext);

    async function onFileChange(e) {
        e.preventDefault();
        try {
            const file = e.target.files[0];
            const data = new FormData();
            data.set('file', file);
            setIsUploading(true);
            updateMessage("Uploading image... Please wait");
            const response = await uploadFileToIPFS(data);
            if (response.success === true) {
                updateMessage("Image uploaded successfully");
                setFileURL(response.pinataURL);
            }
        } catch (error) {
            console.log('Error uploading file: ', error);
            updateMessage("Error uploading file: " + error.message);
        } finally {
            setIsUploading(false);
        }
    }

    async function uploadMetadataToIPFS() {
        const { name, description, price } = formParams;
        if (!name || !description || !price || !fileURL) {
            updateMessage("Please enter all the fields");
            return -1;
        }
    
        console.log("File URL:", fileURL);

        const nftJSON = {
            name,
            description,
            price,
            image: fileURL
        };
        try {
            const response = await uploadJSONToIPFS(nftJSON);
            if (response.success === true) {
                return response.pinataURL;
            } else {
                updateMessage("Error uploading JSON metadata" );
            }
        } catch (error) {
            console.log("Error uploading JSON metadata:", error);
            updateMessage("Error uploading JSON metadata: " + error.message);
        }
    }

    async function listNFT(e) {
        e.preventDefault();

        if (!fileURL) {
            updateMessage("Please upload an image first");
            return;
        }

        try {
            setIsListing(true);
            updateMessage("Preparing to list NFT...");
            const metadataURL = await uploadMetadataToIPFS();
            if (metadataURL === -1) return;

            updateMessage("Uploading to IPFS... Please wait");
            console.log("Metadata URL:", metadataURL);

            if (!window.ethereum) {
                alert("MetaMask is not installed. Please install MetaMask to use this feature.");
                return;
            }

            let contract = new ethers.Contract(
                marketplace.address,
                marketplace.abi,
                signer
            );

            const price = ethers.parseEther(formParams.price); // removed utlis

             // Trigger MetaMask to prompt for transaction approval
            let transaction = await contract.createToken(metadataURL, price);

        
            console.log("Transaction hash:", transaction.hash);

            await transaction.wait();
            updateMessage("");
            updateFormParams({ name: '', description: '', price: '' });
            alert("NFT listed successfully");
            router.push('/');
        } catch (error) {
            console.error("Error listing NFT:", error);
            alert("Error listing NFT: " + error.message);
        } finally {
            setIsListing(false);
        }
    }

    return (
        <div className="flex flex-col min-h-screen">         
            <div className="flex flex-col flex-grow items-center justify-center bg-gray-100 py-12">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    {isConnected ? (
                        <>
                            <h2 className="text-4xl font-bold mb-8">Upload your NFT</h2>
                            <form onSubmit={listNFT}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2 ">NFT name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-lg text-black"
                                        value={formParams.name}
                                        onChange={(e) => updateFormParams({ ...formParams, name: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">NFT description</label>
                                    <textarea
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-lg text-black"
                                        value={formParams.description}
                                        onChange={(e) => updateFormParams({ ...formParams, description: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Price (in Eth)</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-lg text-black"
                                        value={formParams.price}
                                        onChange={(e) => updateFormParams({ ...formParams, price: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Upload image</label>
                                    <input
                                        type="file"
                                        className="w-full px-3 py-2 border rounded-lg text-black"
                                        onChange={onFileChange}
                                    />
                                </div>
                                <div className="mb-4 text-center text-red-500">{message}</div>
                                <button
                                    type="submit"
                                    className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${(isUploading || isListing) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isUploading || isListing}
                                >
                                   {isListing ? 'Listing...' : 'List NFT'}
                                   </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center text-gray-700 font-bold">Connect Your Wallet to Continue...</div>
                    )}
                </div>
            </div>  
        </div>
    );
};


