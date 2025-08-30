"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import MarketplaceJson from "../marketplace.json";
import axios from "axios";
import NFTTile from "@/components/nftCard/NFTCard";
import { WalletContext } from "@/context/Wallet";

export default function Profile() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState("0");
  const { isConnected, userAddress, signer } = useContext(WalletContext);

  const getNFTitems = useCallback(async () => {
    let sumPrice = 0;
    const itemsArray = [];
    if (!signer) return { itemsArray, sumPrice };
    let contract = new ethers.Contract(
      MarketplaceJson.address,
      MarketplaceJson.abi,
      signer
    );

    let transaction = await contract.getMyNFTs();

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
      sumPrice += Number(price);
    }
    return { itemsArray, sumPrice };
  }, [signer]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { itemsArray, sumPrice } = await getNFTitems();
        setItems(itemsArray);
        setTotalPrice(sumPrice.toFixed(2));
      } catch (error) {
        console.error("Error fetching NFT items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isConnected) {
      fetchData();
    }
  }, [isConnected, getNFTitems]);

  return (
    <div className="py-6">
      <div className="max-w-5xl mx-auto">
        {isConnected ? (
          <>
            {/* Wallet Information Card */}
            <div className="card p-8 mb-8">
              <div className="mb-6">
                <span className="font-semibold text-gray-800">Wallet Address:</span>
                <span className="ml-2 text-gray-700 break-all font-mono">{userAddress}</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-gray-800">Number of NFTs:</span>
                  <span className="ml-2 text-3xl font-extrabold text-indigo-600">{items.length}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Total Value:</span>
                  <span className="ml-2 text-3xl font-extrabold text-green-600">{totalPrice} ETH</span>
                </div>
              </div>
            </div>
  
            {/* NFTs Section */}
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">Your NFTs</h2>
              {loading && items.length === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="card overflow-hidden animate-pulse">
                      <div className="h-48 bg-gray-200 dark:bg-gray-800" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />
                        <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : items.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((value, index) => (
                    <NFTTile item={value} key={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-600 text-lg py-12">You don&apos;t have any NFTs...</div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-2xl text-gray-600 font-semibold py-20">
            You are not connected...
          </div>
        )}
      </div>
    </div>
  );
  
}