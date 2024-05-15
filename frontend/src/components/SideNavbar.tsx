"use client"

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Home, CircleUser, Library } from "lucide-react";
import { Link as TransitionLink } from "next-view-transitions";
import Image from "next/image";

export default function SideNavbar({ currentPage }: { currentPage: string }) {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <span>
                    <TransitionLink
                        href="/"
                        className="spotiflyx-logo group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Image
                            className="h-full w-full transition-all group-hover:scale-110"
                            src="/icon.png"
                            alt="Spotiflyx logo"
                            width="594"
                            height="594"
                        />
                        <span className="sr-only">Spotiflyx</span>
                    </TransitionLink>
                </span>
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <span>
                                <TransitionLink
                                    href="/dashboard"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${currentPage === "Dashboard" ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
                                >
                                    <Home className="h-5 w-5" />
                                    <span className="sr-only">Dashboard</span>
                                </TransitionLink>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <span>
                                <TransitionLink
                                    href="/library"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${currentPage === 'Library' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
                                >
                                    <Library className="h-5 w-5" />
                                    <span className="sr-only">Library</span>
                                </TransitionLink>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent side="right">Library</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <span>
                                <TransitionLink
                                    href="/profile"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${currentPage === 'Profile' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}
                                >
                                    <CircleUser className="h-5 w-5" />
                                    <span className="sr-only">Profile</span>
                                </TransitionLink>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent side="right">Profile</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    )
}
