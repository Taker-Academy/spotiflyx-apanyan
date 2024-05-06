import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useCheckAuth(token: string | null) {
  const { replace } = useRouter();

  useEffect(() => {
    if (!token) {
      replace('/login'); // redirect to login if user is not authenticated
    }
  }, [token]);
}