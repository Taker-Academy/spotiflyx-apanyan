"use client"
import { Link } from 'next-view-transitions';

export default function Hero() {
  return (
    <div className='bg-muted/40 h-dvh'>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-48 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Welcome to {" "}
              <span className="font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                Spotiflyx
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8">
              Your ultimate music and video streaming platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/register">
                <button className="animate-bounce cursor-pointer mb-3 py-3 px-7 border-2 rounded-full hover:-translate-y-1 transition border-input bg-background hover:bg-accent hover:text-accent-foreground">
                  Start streaming now
                </button>
              </Link>
            </div>
            <p>
              Already have an account ?{" "}
              <Link href="/login">
                <span className="group cursor-pointer relative inline-block text-pink-500"
                >Log in.<span
                  className="block w-0 h-0.5 bg-current transition-width duration-200 group-hover:w-full absolute bottom-0"
                ></span></span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
