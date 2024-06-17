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
import { Toaster, toast } from 'sonner'

export default function UpdateProfile({ token }: { token: string }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    } else if (password.length < 6 && password !== '') {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    toast.success("Password changed successfully");
    return true;
  };

  const updateUser = async () => {
    const response = await fetch('http://spotiflyx.xyz:8443/user/edit', {
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
      toast.error("An error occured, password not changed");
    }

    const data = await response.json();

    // Update the local data immediately, but disable revalidation
    mutate('http://spotiflyx.xyz:8443/user/edit', data, false);
  };

  const handleUpdate = async (event: any) => {

    if (password && !validatePasswords()) {
      event.preventDefault();
      return;
    }

    await updateUser();
  };

  return (
    <AlertDialog>
      <Toaster richColors position="top-center" />
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
                <Label htmlFor="confirm-new-password">Confirm Password</Label>
                <Input className="mt-2" id="confirm-new-password" placeholder="Confirm new password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </form>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={(event) => handleUpdate(event)}>
            Update your account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
