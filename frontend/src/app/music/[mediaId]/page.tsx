"use client"

import useSWR from 'swr';
import DefaultLayout from "@/components/DefaultLayout";
import MediaPageSkeleton from '@/components/MediaPageSkeleton';

const fetcher = async (url: string) => {
  const token = localStorage.getItem('token');
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await res.json();
}

export default function useMediaDetails({
  params,
}: {
  params: { mediaId: string };
}) {
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
          <iframe
            className='music-iframe'
            src={`https://open.spotify.com/embed/track/${data.data.mediaid}`}
            width="900"
            height="352"
            allowFullScreen={false}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
          </iframe>
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
