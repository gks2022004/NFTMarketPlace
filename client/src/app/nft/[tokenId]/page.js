"use client";

import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import MarketplaceJson from "../../marketplace.json";
import { ethers } from "ethers";
import axios from "axios";
import GetIpfsUrlFromPinata from "@/app/utils";
import Image from "next/image";
import { WalletContext } from "@/context/Wallet";

export default function NFTPage() {
  const params = useParams();
  const tokenId = params.tokenId;
  const [item, setItem] = useState();
  const [msg, setmsg] = useState();
  const [btnContent, setBtnContent] = useState("Buy NFT");
  const { isConnected, userAddress, signer } = useContext(WalletContext);
  const router = useRouter();

  async function getNFTData() {
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
  }

  useEffect(() => {
    async function fetchData() {
      if (!signer) return;
      try {
        const itemTemp = await getNFTData();
        setItem(itemTemp);
      } catch (error) {
        console.error("Error fetching NFT items:", error);
        setItem(null);
      }
    }

    fetchData();
  }, [isConnected]);

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
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();
      alert("You successfully bought the NFT!");
      setmsg("");
      setBtnContent("Buy NFT");
      router.push("/");
    } catch (e) {
      console.log("Buying Error: ", e);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        {isConnected ? (
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2">
              <Image 
                src={item?.image} 
                alt={item?.name} 
                width={800} 
                height={520} 
                className="rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-6">
              <div className="space-y-4">
                <div className="text-xl font-bold text-gray-700">
                  <span className="font-semibold">Name:</span> {item?.name}
                </div>
                <div className="text-lg text-gray-600">
                  <span className="font-semibold">Description:</span> {item?.description}
                </div>
                <div className="text-lg text-gray-600">
                  <span className="font-semibold">Price:</span> {item?.price} ETH
                </div>
                <div className="text-lg text-gray-600">
                  <span className="font-semibold">Seller:</span> {item?.seller}
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
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all disabled:bg-blue-300"
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
      </div>
    </div>
  );
}