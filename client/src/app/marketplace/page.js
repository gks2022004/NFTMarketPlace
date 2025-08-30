"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import MarketplaceJson from "../marketplace.json";
import axios from "axios";
import { WalletContext } from "@/context/Wallet";
import NFTCard from "@/components/nftCard/NFTCard";


export default function Marketplace() {
  const [items, setItems] = useState([]); // Initialize items as an empty array
  const [loading, setLoading] = useState(false);
  const { isConnected, signer } = useContext(WalletContext);

  const getNFTitems = useCallback(async () => {
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
  }, [signer]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const itemsArray = await getNFTitems();
        setItems(itemsArray);
      } catch (error) {
        console.error("Error fetching NFT items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isConnected) fetchData();
  }, [isConnected, getNFTitems]);

  return (
    <div>
      {isConnected ? (
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Marketplace</h2>
              <p className="text-gray-600">Browse listed NFTs</p>
            </div>
          </div>
          {loading && (!items || items.length === 0) ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-800" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />
                    <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : items && items.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((value, index) => (
                <NFTCard item={value} key={index} />
              ))}
            </div>
          ) : (
            <div className="mt-10 text-center text-gray-600">No NFTs listed now...</div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-2xl text-gray-600 font-semibold">You are not connected...</p>
        </div>
      )}
    </div>
  );
}
