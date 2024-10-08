"use client";

import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import MarketplaceJson from "../marketplace.json";
import axios from "axios";
import NFTTile from "../components/nftCard/NFTCard";
import { WalletContext } from "@/context/Wallet";

export default function Profile() {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState("0");
  const { isConnected, userAddress, signer } = useContext(WalletContext);

  async function getNFTitems() {
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
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { itemsArray, sumPrice } = await getNFTitems();
        setItems(itemsArray);
        setTotalPrice(sumPrice.toFixed(2));
      } catch (error) {
        console.error("Error fetching NFT items:", error);
      }
    };

    if (isConnected) {
      fetchData();
    }
  }, [isConnected]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {isConnected ? (
          <>
            {/* Wallet Information Card */}
            <div className="bg-white shadow-lg rounded-lg p-8 mb-10">
              <div className="mb-6">
                <span className="font-semibold text-gray-800">Wallet Address:</span>
                <span className="ml-2 text-blue-600 break-all">{userAddress}</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-gray-800">Number of NFTs:</span>
                  <span className="ml-2 text-3xl font-extrabold text-indigo-600">{items.length}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Total Value:</span>
                  <span className="ml-2 text-3xl font-extrabold text-green-500">{totalPrice} ETH</span>
                </div>
              </div>
            </div>
  
            {/* NFTs Section */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Your NFTs</h2>
              {items.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((value, index) => (
                    <NFTTile item={value} key={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-600 text-xl py-12">
                  You don't have any NFTs...
                </div>
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