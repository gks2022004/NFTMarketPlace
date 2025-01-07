"use client";

import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import MarketplaceJson from "../marketplace.json";
import axios from "axios";
import { WalletContext } from "@/context/Wallet";
import NFTCard from "../components/nftCard/NFTCard";


export default function Marketplace() {
  const [items, setItems] = useState([]); // Initialize items as an empty array
  const { isConnected, signer } = useContext(WalletContext);

  async function getNFTitems() {
    const itemsArray = [];
    if (!signer) return;
    let contract = new ethers.Contract(
      MarketplaceJson.address,
      MarketplaceJson.abi,
      signer
    );

    let transaction = await contract.getAllListedNFTs();

    for (const i of transaction) {
      const tokenId = parseInt(i.tokenId);
      const tokenURI = await contract.tokenURI(tokenId);
      const meta = (await axios.get(tokenURI)).data;
      const price = ethers.formatEther(i.price);

      const item = {
        price,
        tokenId,
        seller: i.seller,
        owner: i.owner,
        image: meta.image,
        name: meta.name,
        description: meta.description,
      };

      itemsArray.push(item);
    }
    return itemsArray;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsArray = await getNFTitems();
        setItems(itemsArray);
      } catch (error) {
        console.error("Error fetching NFT items:", error);
      }
    };

    fetchData();
  }, [isConnected]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8">
        {isConnected ? (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center">NFT Marketplace</h2>
            {items && items.length > 0 ? ( // Add null check here
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((value, index) => (
                  <NFTCard item={value} key={index} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 text-xl">No NFTs Listed Now...</div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-2xl text-gray-600 font-semibold">You are not connected...</p>
          </div>
        )}
      </main>
    </div>
  );
}
