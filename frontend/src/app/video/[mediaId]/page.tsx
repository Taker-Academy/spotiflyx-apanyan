"use client"

import useSWR from 'swr';
import DefaultLayout from "@/components/DefaultLayout";

const fetcher = async (url: string) => {
  const token = localStorage.getItem('token');
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await res.json();
}

export default function mediaDetails({
  params,
}: {
  params: { mediaId: string };
}) {
  const { data, error } = useSWR(`http://127.0.0.1:8080/media/${params.mediaId}`, fetcher);

  if (error) return <div>Failed to load media details</div>
  if (!data) return <div>Loading...</div>
  console.log(data)

  return (
    <DefaultLayout currentPage="video page">
      <div>
        <h1 className="text-3xl">Media details for media {params.mediaId}</h1>
        <p>Type: {data.data.type}</p>
        <p>Date: {data.data.date}</p>
        <p>User ID: {data.data.userId}</p>
        <p>Link: {data.data.link}</p>
        <p>Video title: {data.data.title}</p>
        <p>YouTube channel: {data.data.artiste}</p>
        <p>Media ID: {data.data.mediaid}</p>
        <iframe
          width="900"
          height="500"
          src={`https://www.youtube.com/embed/${data.data.mediaid}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </DefaultLayout>
  );
}
