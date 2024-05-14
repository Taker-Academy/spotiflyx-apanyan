// React imports
import { ReactNode } from 'react';

// Next.js imports
import { Link } from "next-view-transitions";
import Image from 'next/image';

// Auth imports
import { useCheckAuth } from "@/app/auth/useCheckAuth"
import useLocalStorage from "@/app/auth/useLocalStorage"

// Lucide icons
import { Home, Package2, PanelLeft, CircleUser } from "lucide-react"

// UI components
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Custom components
import AddMedia from "@/components/AddMedia"
import SideNavbar from './SideNavbar';
import ProfileDropdown from './ProfileDropdown';
import SearchBar from './SearchBar';
import PhoneNavMenu from './PhoneNavMenu';

export default function DefaultLayout({ children, currentPage }: { children: ReactNode, currentPage: string }) {
    const [token] = useLocalStorage('token', null);
    useCheckAuth(token);

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <SideNavbar currentPage={currentPage} />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <PhoneNavMenu />
                    <SearchBar />
                    <AddMedia />
                    <ProfileDropdown />
                </header>
                {children}
            </div>
        </div>
    )
}
