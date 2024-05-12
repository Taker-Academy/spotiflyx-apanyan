// React imports
import { ReactNode } from 'react';

// Next.js imports
import { Link } from 'next-view-transitions';

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

export default function DefaultLayout({ children, currentPage }: { children: ReactNode, currentPage: string }) {
    const [token] = useLocalStorage('token', null);
    useCheckAuth(token);

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <SideNavbar currentPage = {currentPage} />
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
                                    <span className="sr-only">Spotiflyx</span>
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
                    <SearchBar />
                    <AddMedia />
                    <ProfileDropdown />
                </header>
                {children}
            </div>
        </div>
    )
}
