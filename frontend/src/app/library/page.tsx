"use client"

import DefaultLayout from '@/components/DefaultLayout';
import FavoriteMedias from '@/components/FavoriteMedias';
import LikedMedias from '@/components/LikedMedias';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function Library() {
    return (
        <DefaultLayout currentPage='Library'>
            <Tabs defaultValue="liked">
                <div className="flex items-center">
                    <TabsList className='ml-8'>
                        <TabsTrigger value="liked" className='w-[100px]'>Liked</TabsTrigger>
                        <TabsTrigger value="favorite" className='w-[100px]'>Favorite</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="liked">
                    <LikedMedias />
                </TabsContent>
                <TabsContent value="favorite">
                    <FavoriteMedias />
                </TabsContent>
            </Tabs>
        </DefaultLayout>
    )
}
