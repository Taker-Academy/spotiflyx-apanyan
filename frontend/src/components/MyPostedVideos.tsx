import useSWR, { mutate } from 'swr';
import useLocalStorage from '@/app/auth/useLocalStorage';
import { Button } from "@/components/ui/button"
import { Media } from '@/app/types';
import DeleteMedia from '@/components/DeleteMedia';
import { Link } from 'next-view-transitions';

async function fetcher([url, token]: [string, string]) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('An error occurred while fetching the media data.');
  }

  const data = await response.json();

  return data.data;
}

export default function MyPostedVideos() {
  const [token] = useLocalStorage('token', null);
  const { data: medias, error } = useSWR(['http://127.0.0.1:8080/media/me', token], fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!medias) return <h1 className="text-3xl">Recent videos</h1>;

  return (
    <section>
      <h1 className="text-3xl text-center">Posted videos</h1>
      {medias.filter((media: { type: string; }) => media.type === 'video').map((media: Media) => (
        <div key={media.id}>
          <h2>{media.title}</h2>
          <p>{media.artiste}</p>
          <div className='flex items-center gap-6 relative'>
            <Link href={`/video/${media.id}`} className="absolute w-full h-full top-0 left-0 z-10"></Link>
            <iframe
              width="400"
              height="200"
              src={`https://www.youtube.com/embed/${media.mediaid}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <DeleteMedia media={media} />
          </div>
        </div>
      ))}
    </section>
  );
}
