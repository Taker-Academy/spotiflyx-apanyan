import useSWR, { mutate } from 'swr';
import useLocalStorage from '@/app/auth/useLocalStorage';
import { Media } from '@/app/types';

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

export default function RecentVideos() {
  const [token] = useLocalStorage('token', null);
  const { data: medias, error } = useSWR(['http://127.0.0.1:8080/media', token], fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!medias) return <h1 className="text-3xl">Recent videos</h1>;

  return (
    <section>
      <h1 className="text-3xl text-center">Recent videos</h1>
      {medias.filter((media: { type: string; }) => media.type === 'video').map((media: Media) => (
        <div key={media.id}>
          <h2>{media.title}</h2>
          <p>{media.artiste}</p>
          <div className='flex items-center gap-6'>
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
          </div>
        </div>
      ))}
    </section>
  );
}
