import Image from 'next/image';
import Link from 'next/link';

export default function IndexNavbar() {
    return (
        <header className="text-white font-bold flex justify-between items-center mx-16 mt-8 mb-56">
            <div className="logo cursor-pointer hover:text-slate-300 transition-all duration-200">
                <Link href="/dashboard"><Image src="/icon.png" alt="Spotiflyx logo" height="50" width="50" /></Link>
            </div>
            <div className="navbar flex gap-6">
                <ul className="flex gap-6 items-center">
                    <li className="cursor-pointer py-3 px-7 rounded-full hover:bg-gray-800 hover:-translate-y-1 transition-all duration-200">About us</li>
                    <li className="cursor-pointer py-3 px-7 rounded-full hover:bg-gray-800 hover:-translate-y-1 transition-all duration-200">Services</li>
                    <li className="cursor-pointer py-3 px-7 rounded-full hover:bg-gray-800 hover:-translate-y-1 transition-all duration-200">Contact us</li>
                </ul>
                <ul className="flex gap-4 items-center">
                    <Link href="/login"><li className="cursor-pointer py-3 px-7 border-2 rounded-full hover:bg-gray-800 hover:-translate-y-1 transition-all duration-200">Log in</li></Link>
                    <Link href="/signup"><li className="cursor-pointer py-3 px-7 border-2 rounded-full hover:bg-gray-800 hover:-translate-y-1 transition-all duration-200">Sign up</li></Link>
                </ul>
            </div>
        </header>
    );
}
