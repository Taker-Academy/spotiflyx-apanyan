import Link from "next/link";

export default function Hero() {
    return (
        <main className="hero-container text-white flex flex-col items-center">
            <h1 className="text-8xl mb-4">
                Welcome to <span
                    className="font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent"
                >Spotiflyx</span>
            </h1>
            <h2 className="text-xl mb-10">
                Your ultimate music and video streaming platform.
            </h2>
            <Link href="/signup">
                <button
                    className="animate-bounce cursor-pointer py-3 px-7 mb-3 border-2 border-gray-800 rounded-full hover:bg-gray-800 transition"
                >Start Streaming Now</button>
            </Link>
            <p>
                Already have an account ?{" "}
                <Link href="/login">
                    <span className="group cursor-pointer relative inline-block text-pink-500"
                    >Log in.<span
                        className="block w-0 h-0.5 bg-current transition-width duration-200 group-hover:w-full absolute bottom-0"
                    ></span></span>
                </Link>
            </p>
        </main>
    );
}
