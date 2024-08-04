import Image from "next/image";


export default function Home() {
  return (
   
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-green-500 via-blue-500 to-yellow-500">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover, Collect, and Sell Extraordinary NFTs</h1>
          <p className="text-lg md:text-2xl mb-8">The world's first and largest digital marketplace for crypto collectibles and NFTs</p>
          <button className="bg-white text-purple-700 font-bold py-2 px-4 rounded hover:bg-purple-700 hover:text-white transition duration-300">
            Explore Now
          </button>
        </div>
      </section>

      {/* NFT Grid Section */}
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Trending NFTs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sample NFT Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src="/monkey1.jpg" alt="NFT Sample 1" width={500} height={500} className="w-full h-64 object-cover hover:scale-105 transition duration-300"/>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">NFT Artwork #1</h3>
              <p className="text-gray-600">A unique piece of digital art representing the vibrant and dynamic world of NFTs.</p>
            </div>
          </div>
          {/* Sample NFT Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src="/monkey2.jpg" alt="NFT Sample 2" width={500} height={500} className="w-full h-64 object-cover hover:scale-105 transition duration-300"/>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">NFT Artwork #2</h3>
              <p className="text-gray-600">This NFT showcases the futuristic and abstract designs by leading digital artists.</p>
            </div>
          </div>
          {/* Sample NFT Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src="/monkey3.jpg" alt="NFT Sample 3" width={500} height={500} className="w-full h-64 object-cover hover:scale-105 transition duration-300"/>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">NFT Artwork #3</h3>
              <p className="text-gray-600">An exquisite digital masterpiece that combines creativity and technology.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src="/monkey5.jpg" alt="NFT Sample 1" width={500} height={500} className="w-full h-64 object-cover hover:scale-105 transition duration-300"/>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">NFT Artwork #1</h3>
              <p className="text-gray-600">A unique piece of digital art representing the vibrant and dynamic world of NFTs.</p>
            </div>
          </div>
          {/* Sample NFT Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src="/monkey6.jpg" alt="NFT Sample 2" width={500} height={500} className="w-full h-64 object-cover hover:scale-105 transition duration-300"/>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">NFT Artwork #2</h3>
              <p className="text-gray-600">This NFT showcases the futuristic and abstract designs by leading digital artists.</p>
            </div>
          </div>
          {/* Sample NFT Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src="/monkey7.jpg" alt="NFT Sample 3" width={500} height={500} className="w-full h-64 object-cover hover:scale-105 transition duration-300"/>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">NFT Artwork #3</h3>
              <p className="text-gray-600">An exquisite digital masterpiece that combines creativity and technology.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
