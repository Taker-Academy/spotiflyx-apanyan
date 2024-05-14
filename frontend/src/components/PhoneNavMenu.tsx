// Next.js imports
import { Link } from "next-view-transitions";
import Image from 'next/image';

// Lucide icons
import { Home, PanelLeft, CircleUser, Library } from "lucide-react"

// UI components
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function PhoneNavMenu() {
    return (
        <Sheet>
        <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-">
                <Link
                    href="/"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                    <Image
                        className="h-10 w-10 group-hover:scale-110 transition"
                        src="/icon.png"
                        alt=""
                        width="100"
                        height="100"
                    />
                    <span className="sr-only">Spotiflyx</span>
                </Link>
                <Link
                    href="/dashboard"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <Home className="h-5 w-5" />
                    Dashboard
                </Link>
                <Link
                    href="/library"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <Library className="h-5 w-5" />
                    Library
                </Link>
                <Link
                    href="/profile"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <CircleUser className="h-5 w-5" />
                    Profile
                </Link>
            </nav>
        </SheetContent>
    </Sheet>
    )
}
