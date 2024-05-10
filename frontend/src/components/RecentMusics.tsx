import useSWR, { mutate } from 'swr';
import useLocalStorage from '@/app/auth/useLocalStorage';
import { Button } from "@/components/ui/button"

type Media = {
  id: number;
  type: string;
  date: string;
  userId: number;
  link: string;
  title: string;
  artiste: string;
};

async function deleteMedia(id: number) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://127.0.0.1:8080/media/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('An error occurred while deleting the media.');
  }

  const data = await response.json();

  if (!data.ok) {
    throw new Error(data.error);
  }

  // Revalidate the data after a media is deleted
  mutate(['http://127.0.0.1:8080/media', token]);
}

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
  const { data: medias, error } = useSWR(['http://127.0.0.1:8080/media', token], fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!medias) return <h1 className="text-3xl">Recent musics</h1>;

  return (
    <section>
      <h1 className="text-3xl text-center">Recent musics</h1>
      {medias.filter((media: { type: string; }) => media.type === 'music').map((media: Media) => (
        <div key={media.id}>
          <h2>{media.title}</h2>
          <p>{media.artiste}</p>
          <div className='flex items-center gap-6'>
            <iframe
              className="rounded-sm"
              src="https://open.spotify.com/embed/track/60a0Rd6pjrkxjPbaKzXjfq?utm_source=generator"
              width="400"
              height="200"
              frameBorder="0"
              allowFullScreen={false}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy">
            </iframe>
            <Button variant="destructive" onClick={() => deleteMedia(media.id)}>Delete song</Button>
          </div>
        </div>
      ))}
    </section>
  );
}
