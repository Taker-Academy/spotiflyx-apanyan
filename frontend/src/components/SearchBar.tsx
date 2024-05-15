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

    var { data: media, error } = useSWR('http://localhost:8080/media', fetcher)


    if (error) return <div>Failed to load</div>
    if (!media) return <div>Loading...</div>
    console.log(media.data)

    media = media.data

    return (
        <p>Search</p>
    )
}
