"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCheckAuth } from "@/app/auth/useCheckAuth"
import logout from "@/app/auth/logout"
import useLocalStorage from "@/app/auth/useLocalStorage"

import {
  Home,
  LineChart,
  Package2,
  ShoppingCart,
  Package,
  PanelLeft,
  Users2,
  Settings,
  Search,
  CircleUser,
  Circle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import AddMedia from "@/components/AddMedia"
import DeleteAccount from "@/components/DeleteAccount"
import UpdateProfile from "@/components/UpdateProfile"

export default function Dashboard() {
  const [token] = useLocalStorage('token', null); // get the token from local storage
  useCheckAuth(token); // call checkAuth after the token has been retrieved
  const [userFirstName, setUserFirstName] = useState('');
  const [previousRoute, setPreviousRoute] = useState<string | null>(null);

  useEffect(() => {
    const route = localStorage.getItem('previousRoute');
    if (route === '/signup') {
      setPreviousRoute(route);
      localStorage.removeItem('previousRoute');
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('http://127.0.0.1:8080/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUserFirstName(data.data.firstName);
      } else {
        console.error('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Image
              className="h-full w-full transition-all group-hover:scale-110"
              src="/icon.png"
              alt="Spotiflyx logo"
              width="594"
              height="594"
            />
            <span className="sr-only">Spotiflyx</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/profile"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <CircleUser className="h-5 w-5" />
                  Profile
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <h1 className="text-5xl ml-8 mt-10">
          Your profile
        </h1>
        <main className="mt-4 flex justify-evenly">
          <UpdateProfile />
          <DeleteAccount />
        </main>
      </div>
    </div>
  )
}
