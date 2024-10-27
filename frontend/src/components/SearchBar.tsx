"use client"

import * as React from "react"
import { Check, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import useSWR from 'swr'
import { Media } from "@/app/types"
import { Link } from "next-view-transitions"

const fetcher = async (url: string) => {
    const token = localStorage.getItem('token')
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({ 'Authorization': 'Bearer ' + token }),
    })
    return await res.json()
}


export default function SearchBar() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    var { data: media, error } = useSWR('https://api.spotiflyx.xyz/media', fetcher)


    if (error) return <div>Failed to load</div>
    if (!media) return <div>Loading...</div>
    console.log(media.data)

    media = media.data

    return (
        <div className="relative ml-auto flex-1 md:grow-0">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="justify-between w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    >
                        {value
                            ? media.find((item: Media) => String(item.id) === value)?.title
                            : "Search media..."}
                        <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search media..." />
                        <CommandEmpty>No media found.</CommandEmpty>
                        <CommandGroup>
                            {media ? media.map((item: Media) => (
                                <CommandList key={item.id}>
                                    <Link href={`/video/${item.id}`}>
                                        <CommandItem
                                            value={String(item.id)}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setOpen(false)
                                            }}
                                        >
                                            <div className="w-full flex justify-between">
                                                <p>{item.title}</p>
                                                <p className="opacity-25">{item.type}</p>
                                            </div>
                                        </CommandItem>
                                    </Link>
                                </CommandList>
                            )) : null}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}