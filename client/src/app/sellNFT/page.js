"use client";
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { WalletContext } from '@/context/Wallet';
import { uploadFileToIPFS, uploadJSONToIPFS } from '../pinata';
import { marketplace } from '../marketplace';
import { Footer } from '../components/footer/Footer';
import Header from '../components/header/Header';

export default function SellNFT(){
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: '' });
    const [fileURL, setFileURL] = useState();
    const [message, updateMessage] = useState('');
    const [btn, setBtn] = useState(false);
    const [btnContent, setBtnContent] = useState('List NFT');
    const router = useRouter();
    const { isConnected, signer } = useContext(WalletContext);

    async function onFileChange(e) {
        try {
            const file = e.target.files[0];
            const data = new FormData();
            data.set('file', file);
            setBtn(false);
            updateMessage("Uploading image... Please wait");
            const response = await uploadFileToIPFS(data);
            if (response.success === true) {
                setBtn(true);
                updateMessage("");
                setFileURL(response.pinataURL);
            }
        } catch (error) {
            console.log('Error uploading file: ', error);
        }
    }

    async function uploadMetadataToIPFS() {
        const { name, description, price } = formParams;
        if (!name || !description || !price || !fileURL) {
            updateMessage("Please enter all the fields");
            return -1;
        }
        const nftJSON = {
            name,
            description,
            price,
            image: fileURL
        };
        try {
            const pinataResponse = await uploadJSONToIPFS(nftJSON);
            if (pinataResponse.success === true) {
                return pinataResponse.pinataURL;
            }
        } catch (error) {
            console.log("Error uploading JSON metadata:", error);
        }
    }

    async function listNFT(e) {
        e.preventDefault();
        try {
            setBtnContent("Listing...");
            const metadataURL = await uploadMetadataToIPFS();
            if (metadataURL === -1) return;

            updateMessage("Uploading to IPFS... Please wait");

            let contract = new ethers.Contract(
                marketplace.address,
                marketplace.abi,
                signer
            );

            const price = ethers.utils.parseEther(formParams.price);

            let transaction = await contract.createToken(metadataURL, price);
            await transaction.wait();
            setBtnContent("List NFT");
            setBtn(false);
            updateMessage("");
            updateFormParams({ name: '', description: '', price: '' });
            alert("NFT listed successfully");
            router.push('/');
        } catch (error) {
            alert("Error listing NFT", error);
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
                                    <label className="block text-gray-700 font-bold mb-2">NFT name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-lg"
                                        value={formParams.name}
                                        onChange={(e) => updateFormParams({ ...formParams, name: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">NFT description</label>
                                    <textarea
                                        type="text"
                                        className="w-full px-3 py-2 border rounded-lg"
                                        value={formParams.description}
                                        onChange={(e) => updateFormParams({ ...formParams, description: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Price (in Eth)</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-lg"
                                        value={formParams.price}
                                        onChange={(e) => updateFormParams({ ...formParams, price: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Upload image</label>
                                    <input
                                        type="file"
                                        className="w-full px-3 py-2 border rounded-lg"
                                        onChange={onFileChange}
                                    />
                                </div>
                                <div className="mb-4 text-center text-red-500">{message}</div>
                                <button
                                    type="submit"
                                    className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${btn ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={btn}
                                >
                                    {btnContent}
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


