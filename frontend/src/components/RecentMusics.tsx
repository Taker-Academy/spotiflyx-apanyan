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
  const [token] = useLocalStorage('token', null); // get the token from local storage
  const { data: medias, error } = useSWR(['http://127.0.0.1:8080/media', token], fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!medias) return <h1 className="text-3xl">Recent musics</h1>;

  return (
    <section>
      <h1 className="text-3xl">Recent musics</h1>
      {medias.map((media: Media) => (
        <div key={media.id}>
          <h2>{media.title}</h2>
          <p>{media.artiste}</p>
          <a href={media.link}>Watch video</a>
        </div>
      ))}
    </section>
  );
}
