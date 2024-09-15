import GetIpfsUrlFromPinata from "@/app/utils";
import Image from "next/image";
import Link from "next/link";

export default function NFTCard({ item }) {
  const IPFSUrl = GetIpfsUrlFromPinata(item.image);

  const limitedDescription =
    item.description.length > 100
      ? item.description.substring(0, 100) + "..."
      : item.description;

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-gradient-to-br from-purple-500 to-pink-500 p-1">
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="relative w-full h-0 pb-[75%]">
          <Image 
            src={IPFSUrl} 
            alt={item.name} 
            layout="fill" 
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{item.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{limitedDescription}</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-90">
        <Link href={`/nft/${item.tokenId}`} className="flex flex-col justify-end h-full p-6 text-white">
          <h3 className="text-2xl font-bold mb-2 text-purple-300">{item.name}</h3>
          <p className="text-sm text-pink-200">{limitedDescription}</p>
          <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}