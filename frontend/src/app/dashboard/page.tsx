"use client"

// React imports
import { useEffect, useState } from "react"

// SWR
import useSWR from 'swr';

// Auth imports
import { useCheckAuth } from "@/app/auth/useCheckAuth"
import useLocalStorage from "@/app/auth/useLocalStorage"

// Custom components
import RecentVideos from "@/components/RecentVideos"
import RecentMusics from "@/components/RecentMusics"
import DefaultLayout from "@/components/DefaultLayout"

export default function Dashboard() {
  const [token] = useLocalStorage('token', null); // get the token from local storage
  useCheckAuth(token); // call checkAuth after the token has been retrieved
  const [previousRoute, setPreviousRoute] = useState<string | null>(null);

  const { data: userData, error } = useSWR('http://127.0.0.1:8080/user/me', async url => {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return response.json();
  });

  const userFirstName = userData?.data.firstName;

  useEffect(() => {
    const route = localStorage.getItem('previousRoute');
    if (route === '/signup') {
      setPreviousRoute(route);
      localStorage.removeItem('previousRoute');
    }
  }, []);

  return (
    <DefaultLayout currentPage="Dashboard">
      <h1 className="text-5xl ml-8">
        {previousRoute === '/signup' ? 'Welcome' : 'Welcome back'}, {userFirstName}!
      </h1>
      <main className="mt-4 flex flex-wrap justify-evenly">
        <RecentVideos />
        <RecentMusics />
      </main>
    </DefaultLayout>
  )
}
