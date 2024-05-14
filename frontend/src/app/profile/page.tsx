"use client"

// Next.js imports
import { Link } from "next-view-transitions";

// Auth imports
import { useCheckAuth } from "@/app/auth/useCheckAuth"
import useLocalStorage from "@/app/auth/useLocalStorage"

// Lucide icons
import { Home, Package2, PanelLeft, CircleUser } from "lucide-react"

// UI components
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Custom components
import SideNavbar from '@/components/SideNavbar';
import DeleteAccount from '@/components/DeleteAccount';
import UpdateProfile from '@/components/UpdateProfile';
import MyPostedMusics from '@/components/MyPostedMusics';
import MyPostedVideos from '@/components/MyPostedVideos';
import PhoneNavMenu from '@/components/PhoneNavMenu';

export default function Profile() {
  const [token] = useLocalStorage('token', null);
  useCheckAuth(token);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavbar currentPage={"Profile"} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <PhoneNavMenu />
        </header>
        <h1 className="text-5xl ml-8 mt-10 max-sm:text-center max-sm:ml-0">
          My profile
        </h1>
        <main className='flex flex-col items-center'>
          <div className='flex justify-center'>
            <CircleUser
              className="h-96 w-96"
              strokeWidth={0.5}
            />
          </div>
          <div className="w-1/2 mt-4 flex justify-evenly max-sm:gap-6 max-sm:justify-center">
            <UpdateProfile token={token} />
            <DeleteAccount token={token} />
          </div>
        </main>
        <section className="mt-4 flex flex-wrap justify-evenly">
          <MyPostedVideos />
          <MyPostedMusics />
        </section>
      </div>
    </div>
  )
}
