import useSWR, { mutate } from 'swr';
import useLocalStorage from '@/app/auth/useLocalStorage';
import { Button } from "@/components/ui/button"
import { Media } from '@/app/types';
import DeleteMedia from '@/components/DeleteMedia';

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

export default function MyPostedMusics() {
  const [token] = useLocalStorage('token', null);
  const { data: medias, error } = useSWR(['http://127.0.0.1:8080/media/me', token], fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!medias) return <h1 className="text-3xl">Recent musics</h1>;

  return (
    <section>
      <h1 className="text-3xl text-center">Posted musics</h1>
      {medias.filter((media: { type: string; }) => media.type === 'music').map((media: Media) => (
        <div key={media.id}>
          <h2>{media.title}</h2>
          <p>{media.artiste}</p>
          <div className='flex items-center gap-6'>
            <iframe
              className="rounded-sm"
              src={`https://open.spotify.com/embed/track/${media.mediaid}`}
              width="400"
              height="200"
              frameBorder="0"
              allowFullScreen={false}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy">
            </iframe>
            <DeleteMedia media={media} />
          </div>
        </div>
      ))}
    </section>
  );
}
