
import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link href="/">
                        NFT Marketplace
                    </Link>
                </div>
                <div className="flex-grow">
                    <ul className="flex justify-center space-x-8">
                        <li>
                            <Link href="/" className="hover:underline text-lg">
                                Marketplace
                            </Link>
                        </li>
                        <li>
                            <Link href="/list" className="hover:underline text-lg">
                                List
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile" className="hover:underline text-lg">
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
