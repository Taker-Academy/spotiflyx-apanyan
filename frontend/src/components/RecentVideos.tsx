import useSWR from 'swr';
import useLocalStorage from '@/app/auth/useLocalStorage';

type Media = {
  id: number;
  type: string;
  date: string;
  userId: number;
  link: string;
  title: string;
  artiste: string;
};

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

export default function RecentVideos() {
  const [token] = useLocalStorage('token', null); // get the token from local storage
  const { data: medias, error } = useSWR(['http://127.0.0.1:8080/media', token], fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!medias) return <h1 className="text-3xl">Recent videos</h1>;

  return (
    <section>
      <h1 className="text-3xl text-center">Recent videos</h1>
      {medias.map((media: Media) => (
        <div key={media.id}>
          <h2>{media.title}</h2>
          <p>{media.artiste}</p>
          <iframe
            width="400"
            height="200"
            src={media.link ? convertToEmbedUrl(media.link) : ''}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </section>
  );
}
