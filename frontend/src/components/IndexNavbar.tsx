"use client"
import { useState } from 'react'
import { Menu, Package2, Home, CircleUser } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import { Link } from 'next-view-transitions';;

export default function IndexNavbar() {
    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/dashboard" className="-m-1.5 p-1.5 hover:scale-105 transition">
                        <span className="sr-only">Your Company</span>
                        <Image
                            className="h-12 w-auto"
                            src="/icon.png"
                            alt=""
                            width="100"
                            height="100"
                        />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="/dashboard"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">Spotiflyx</span>
                                </Link>
                                <Link
                                    href="/login"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <CircleUser className="h-5 w-5" />
                                    Register
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:justify-end sm:gap-4">
                    <Link href="/login"><button className="cursor-pointer py-3 px-7 border-2 rounded-full hover:-translate-y-1 transition-all duration-200 border-input bg-background hover:bg-accent hover:text-accent-foreground">Log in</button></Link>
                    <Link href="/register"><button className="cursor-pointer py-3 px-7 border-2 rounded-full hover:-translate-y-1 transition-all duration-200 bg-primary/90 text-primary-foreground hover:bg-primary/70">Register</button></Link>
                </div>
            </nav>

        </header>
    );
}
