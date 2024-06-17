import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useRef } from 'react';
import useLocalStorage from "@/app/auth/useLocalStorage"
import { mutate } from 'swr';

export default function AddMedia() {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [mediaType, setMediaType] = useState('video'); // default to 'video'
  const [token] = useLocalStorage('token', null); // get the token from local storage

  const addMedia = async () => {
    const response = await fetch('http://spotiflyx.xyz:8080/media', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: mediaType, // use the state variable here
        title,
        link,
      }),
    });

    const data = await response.json();

    if (data.ok) {
      mutate(['http://spotiflyx.xyz:8080/media', token]);
    } else {
      console.error('An error occurred while creating the media:', data.error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Create new media</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl mb-2">Create a new media</AlertDialogTitle>
          <section>
            <h1 className="text-xl mb-2">What type of content do you want to post ?</h1>
            <RadioGroup value={mediaType} onValueChange={setMediaType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video">Video</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="music" id="music" />
                <Label htmlFor="music">Music</Label>
              </div>
            </RadioGroup>
          </section>
          <Input
            type="text"
            placeholder="Media name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Media link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={addMedia}>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
