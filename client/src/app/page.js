import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section — crypto/geek aesthetic */}
      <section className="relative overflow-hidden rounded-2xl text-white bg-zinc-950 ring-1 ring-zinc-800">
        {/* Neon glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-cyan-400/20 blur-3xl" />
        {/* Subtle matrix grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 0 0",
          }}
          aria-hidden
        />
        <div className="container-pro py-16 md:py-24 relative">
          <div className="max-w-5xl">
            <span className="inline-flex items-center gap-2 border border-lime-400/30 text-lime-300/90 bg-zinc-900/60 px-3 py-1 rounded-full text-[13px] font-mono">
              <span className="inline-block h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
              &gt;&gt; live_marketplace
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-black leading-[1.1] drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]">
              Discover digital art and collectibles powered by Web3
            </h1>
            <p className="mt-4 text-lg md:text-xl text-zinc-300 max-w-3xl font-mono">
              Buy, sell, and explore unique NFTs from creators across the globe. Low fees, fast listings, and a seamless experience.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/marketplace" className="inline-flex items-center rounded-lg bg-cyan-500 text-white font-semibold px-4 py-2 shadow-sm hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/60">
                Explore Marketplace
              </Link>
              <Link href="/sellNFT" className="inline-flex items-center rounded-lg bg-zinc-800 text-white font-semibold px-4 py-2 shadow-sm hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600">
                List your NFT
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              {[{label:'Items', value:'12.9k+'},{label:'Creators',value:'3.1k+'},{label:'Sales',value:'48k+'},{label:'Volume',value:'2.7k ETH'}].map((s,i)=> (
                <div key={i} className="rounded-xl p-4 bg-zinc-900/60 ring-1 ring-zinc-700/60">
                  <div className="text-2xl font-extrabold text-white">{s.value}</div>
                  <div className="text-sm text-zinc-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights / features */}
      <section className="mt-12">
        <div className="container-pro grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
            title:'Low Fees',
            desc:'List and trade with competitive fees designed for creators and collectors.'
          },{
            title:'Secure & Transparent',
            desc:'Smart-contract powered trades with on-chain provenance.'
          },{
            title:'Fast Listings',
            desc:'Mint and list your collection in minutes—no hassle.'
          }].map((f,i)=> (
            <div key={i} className="card card-hover p-6">
              <div className="text-lg font-bold">{f.title}</div>
              <p className="mt-1 text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="mt-12">
        <div className="container-pro">
          <div className="card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xl md:text-2xl font-extrabold">Ready to showcase your art?</div>
              <div className="text-gray-600">List your first NFT on the marketplace today.</div>
            </div>
            <Link href="/sellNFT" className="btn-primary">Start Listing</Link>
          </div>
        </div>
      </section>

      {/* NFT Grid Section */}
      <section className="mt-12">
        <div className="container-pro">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Trending NFTs</h2>
          <p className="text-gray-600 mt-1">A curated selection from the community</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Cards */}
            {["/monkey1.jpg","/monkey2.jpg","/monkey3.jpg","/monkey5.jpg","/monkey6.jpg","/monkey7.jpg"].map((src, i) => (
              <div key={i} className="card card-hover overflow-hidden">
                <Image src={src} alt={`NFT Sample ${i+1}`} width={800} height={600} className="w-full h-60 object-cover"/>
                <div className="p-5">
                  <h3 className="text-lg font-bold">NFT Artwork #{i+1}</h3>
                  <p className="mt-1 text-sm text-gray-600">An exquisite digital piece that blends creativity and technology.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
