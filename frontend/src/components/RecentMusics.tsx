import useSWR, { mutate } from 'swr';
import useLocalStorage from '@/app/auth/useLocalStorage';
import { Media } from '@/app/types';
import { Link } from "next-view-transitions";

function convertToEmbedUrl(url: string): string {
  if (!url) {
    return '';
  }

  const videoId = url.split('youtu.be/')[1]?.split('?')[0];
  return `https://www.youtube.com/embed/${videoId}`;
}

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

export default function RecentMusics() {
  const [token] = useLocalStorage('token', null);
  const { data: medias, error } = useSWR(['http://spotiflyx.xyz:8080/media', token], fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!medias) return <h1 className="text-3xl">Recent musics</h1>;

  return (
    <section>
      <h1 className="text-3xl text-center mb-8">Recent musics</h1>
      {medias.filter((media: { type: string; }) => media.type === 'music').slice(0, 3).map((media: Media) => (
        <div key={media.id}>
          <h2 className='text-2xl font-semibold mb-2 ml-4'>{media.title}</h2>
          <div className='flex items-center gap-6 relative'>
            <Link href={`/music/${media.id}`} className="absolute w-full h-full top-0 left-0 z-10"></Link>
            <iframe
              className={`music-iframe-${media.id}`}
              style={{ viewTransitionName: `music-iframe-${media.id}-transition` }}
              src={`https://open.spotify.com/embed/track/${media.mediaid}`}
              width="325"
              height="180"
            >
            </iframe>
          </div>
        </div>
      ))}
    </section>
  );
}
