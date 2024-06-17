import useSWR from 'swr';
import { useRouter } from 'next/navigation';

export function useCheckAuth(token: string | null) {
  const { replace } = useRouter();

  const { data, error } = useSWR('http://spotiflyx.xyz:8080/user/me', async url => {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('User is not authenticated');
    }

    return response.json();
  });

  if (error) {
    replace('/login');
  }

  return { user: data, isLoading: !error && !data, isError: error };
}
