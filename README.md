# NFT Marketplace

Advanced NFT Marketplace that allows users to create, mint, buy, and sell NFTs seamlessly. Built with Solidity, Next.js, React, and Ethers.js, this platform offers secure transactions, user-friendly interfaces, and decentralized metadata storage using Pinata IPFS.

## Features

- **NFT Creation:** Upload images, set prices, and mint NFTs with metadata stored on Pinata IPFS.
- **Buy & Sell NFTs:** Securely buy and sell NFTs with efficient smart contract integration.
- **Authentication:** JWT-based authentication for secure API interaction with Pinata.
- **Smart Contract Integration:** Optimized contract interactions for scalable and reliable trading.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS.
- **Backend:** Node.js, Ethers.js, Axios, and JWT for API calls and authentication.
- **Smart Contracts:** Solidity for NFT minting and trading.
- **Storage:** Pinata IPFS for decentralized file and metadata storage.

## API Authentication

- Pinata's API requires authentication to ensure only authorized users can upload files.  
- **JWT Token:** The JWT token serves as a credential to authenticate with Pinata's servers. It is generated using the provided Pinata API key and secret key.  
- This ensures secure and authorized access for uploading files and metadata to Pinata IPFS.

## Installation

   ```bash
   git clone https://github.com/gks2022004/NFTMarketPlace.git

   cd client

   npm i

   npm run dev
   
   ```
## Create .env file:

``` bash
PINATA_API_KEY=
PINATA_API_SECRET_KEY=
JWT=
```

   
   
   
