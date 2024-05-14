import useSWR, { mutate } from 'swr';
import useLocalStorage from '@/app/auth/useLocalStorage';
import { Media } from '@/app/types';
import { Link } from "next-view-transitions";

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
      <h1 className="text-3xl text-center mb-8">Recent videos</h1>
      <main className='space-y-8'>
        {medias.filter((media: { type: string; }) => media.type === 'video').map((media: Media) => (
          <div key={media.id}>
            <h2 className='text-2xl font-semibold mb-2 ml-4'>{media.title}</h2>
            <div className='flex items-center gap-6 relative'>
              <Link href={`/video/${media.id}`} className="absolute w-full h-full top-0 left-0 z-10"></Link>
              <iframe
                width="325"
                height="180"
                src={`https://www.youtube.com/embed/${media.mediaid}`}
                title="YouTube video player"
              ></iframe>
            </div>
          </div>
        ))}
      </main>
    </section>
  );
}
