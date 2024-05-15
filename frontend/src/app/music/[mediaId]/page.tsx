"use client"

import { useState } from 'react';
import useSWR from 'swr';
import DefaultLayout from "@/components/DefaultLayout";
import MediaPageSkeleton from '@/components/MediaPageSkeleton';
import Heart from "react-animated-heart";
import StarButton from "@/components/StarButton";

const fetcher = async (url: string) => {
  const token = localStorage.getItem('token');
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await res.json();
}

export default function MediaDetails({
  params,
}: {
  params: { mediaId: string };
}) {
  const [starred, setStarred] = useState(false);
  const [liked, setLiked] = useState(false);

  const toggleStarred = async () => {
    setStarred((starred) => !starred);
    const response = await fetch(`http://127.0.0.1:8080/favoris/${params.mediaId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
  };

  const toggleLiked = async () => {
    setLiked((liked) => !liked);
    const response = await fetch(`http://127.0.0.1:8080/likes/${params.mediaId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
  };

  const { data, error } = useSWR(`http://127.0.0.1:8080/media/${params.mediaId}`, fetcher);

  if (error) return <DefaultLayout currentPage='video page'>Failed to load media details</DefaultLayout>
  if (!data) return <DefaultLayout currentPage='video page'><MediaPageSkeleton /></DefaultLayout>

  const media = data.data;

  // Parse the date string and format it
  const date = new Date(media.date);
  const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  return (
    <DefaultLayout currentPage="video page">
      <main className='ml-6'>
        <h1 className="text-3xl mb-12">{media.title}</h1>
        <section className='flex justify-between'>
          <div className='flex flex-col'>
            <iframe
              className='music-iframe'
              src={`https://open.spotify.com/embed/track/${data.data.mediaid}`}
              width="900"
              height="352"
              allowFullScreen={false}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy">
            </iframe>
            <div className='mr-6 mt-6 flex justify-end gap-4'>
              <Heart isClick={liked} onClick={toggleLiked} />
              <StarButton starred={starred} onClick={toggleStarred} />
            </div>
          </div>
          <div className='flex flex-col justify-between gap-2 mr-8'>
            <div>
              <p>Posted on the {formattedDate}</p>
              <p>Artist: {media.artiste}</p>
            </div>
            <div>
              <p>Posted by: {media.userId}</p>
            </div>
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
}
