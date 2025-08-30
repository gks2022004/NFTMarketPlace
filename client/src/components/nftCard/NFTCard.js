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
    <Link href={`/nft/${item.tokenId}`} className="card card-hover overflow-hidden block">
      <div className="relative w-full aspect-[4/3]">
        <Image 
          src={IPFSUrl} 
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-gray-900 truncate">{item.name}</h3>
          <span className="text-sm font-semibold text-indigo-600 whitespace-nowrap">{item.price} ETH</span>
        </div>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{limitedDescription}</p>
      </div>
    </Link>
  );
}
