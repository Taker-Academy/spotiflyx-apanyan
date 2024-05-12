import { useState } from 'react';
import { mutate } from 'swr';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UpdateProfile({ token }: { token: string }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdate = async () => {
    const response = await fetch('http://127.0.0.1:8080/user/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      // handle error
    }

    const data = await response.json();

    // Update the local data immediately, but disable revalidation
    mutate('http://127.0.0.1:8080/user/edit', data, false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Update profile</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-4">Update your profile</AlertDialogTitle>
          <AlertDialogDescription className="space-y-6">
            <div className="personal-informations space-y-3">
              <form>
                <Label>Personal informations</Label>
                <Input className="mt-2" id="new-first-name" placeholder="New first name" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
              </form>
              <form>
                <Input id="new-last-name" placeholder="New last name" type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
              </form>
              <form>
                <Input id="email" placeholder="New email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </form>
            </div>
            <div className="password space-y-3">
              <form>
                <Label htmlFor="new-password">Password</Label>
                <Input className="mt-2" id="new-password" placeholder="New password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </form>
              <form>
                <Input id="confirm-new-password" placeholder="Confirm new password" type="password" />
              </form>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdate}>Update your account</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
