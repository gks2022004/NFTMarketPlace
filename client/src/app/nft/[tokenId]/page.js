"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import MarketplaceJson from "../../marketplace.json";
import { ethers } from "ethers";
import axios from "axios";
import GetIpfsUrlFromPinata from "@/app/utils";
import Image from "next/image";
import { WalletContext } from "@/context/Wallet";
import toast from 'react-hot-toast';

export default function NFTPage() {
  const params = useParams();
  const tokenId = params.tokenId;
  const [item, setItem] = useState();
  const [msg, setmsg] = useState();
  const [btnContent, setBtnContent] = useState("Buy NFT");
  const { isConnected, userAddress, signer } = useContext(WalletContext);
  const router = useRouter();

  const getNFTData = useCallback(async () => {
    if (!signer) return;
    let contract = new ethers.Contract(
      MarketplaceJson.address,
      MarketplaceJson.abi,
      signer
    );
    let tokenURI = await contract.tokenURI(tokenId);
    console.log(tokenURI);
    const listedToken = await contract.getNFTListing(tokenId);
    tokenURI = GetIpfsUrlFromPinata(tokenURI);
    console.log(tokenURI);
    const meta = (await axios.get(tokenURI)).data;
    const item = {
      price: meta.price,
      tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    };
    return item;
  }, [signer, tokenId]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!signer) return;
      try {
        setLoading(true);
        const itemTemp = await getNFTData();
        setItem(itemTemp);
      } catch (error) {
        console.error("Error fetching NFT items:", error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isConnected, getNFTData, signer]);

  async function buyNFT() {
    try {
      if (!signer) return;
      let contract = new ethers.Contract(
        MarketplaceJson.address,
        MarketplaceJson.abi,
        signer
      );
      const salePrice = ethers.parseUnits(item.price, "ether").toString();
  setBtnContent("Processing...");
  setmsg("Buying the NFT... Please Wait (Upto 5 mins)");
  const tId = toast.loading('Processing purchase... approve in wallet');
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();
  toast.success('You successfully bought the NFT!', { id: tId });
      setmsg("");
      setBtnContent("Buy NFT");
      router.push("/");
    } catch (e) {
      console.log("Buying Error: ", e);
  toast.error('Buying error: ' + (e?.message || 'Unknown error'));
    }
  }

  return (
    <div className="py-6">
      <div className="card overflow-hidden max-w-5xl mx-auto">
        {isConnected ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="">
              <Image 
                src={item?.image} 
                alt={item?.name} 
                width={1200} 
                height={800} 
                className="rounded-md object-cover w-full h-auto"
              />
            </div>
            <div className="">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{item?.name}</h1>
              <p className="mt-2 text-gray-600">{item?.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="card p-3">
                  <div className="text-gray-500">Price</div>
                  <div className="text-lg font-bold text-indigo-600">{item?.price} ETH</div>
                </div>
                <div className="card p-3">
                  <div className="text-gray-500">Seller</div>
                  <div className="font-mono text-sm break-all">{item?.seller}</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="text-red-500 text-center mb-4">{msg}</div>
                {userAddress.toLowerCase() === item?.seller.toLowerCase() ? (
                  <div className="text-center text-yellow-500 font-semibold">
                    You already own this NFT!
                  </div>
                ) : (
                  <button
                    onClick={buyNFT}
                    className="w-full btn-primary"
                    disabled={btnContent === "Processing..."}
                  >
                    {btnContent === "Processing..." && (
                      <span className="inline-block animate-spin mr-2 border-2 border-t-2 border-white border-opacity-50 rounded-full h-5 w-5"></span>
                    )}
                    {btnContent}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg font-semibold">
            You are not connected...
          </div>
        )}
        {loading && (
          <div className="p-6 animate-pulse">
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="mt-4 h-6 w-1/3 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="mt-2 h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        )}
      </div>
    </div>
  );
}