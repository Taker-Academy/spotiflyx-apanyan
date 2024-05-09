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

export default function UpdateProfile() {
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
                <Input className="mt-2" id="new-first-name" placeholder="New first name" type="text" />
              </form>
              <form>
                <Input id="new-last-name" placeholder="New last name" type="text" />
              </form>
              <form>
                <Input id="email" placeholder="New email" type="email" />
              </form>
            </div>
            <div className="username">
              <form>
                <Label htmlFor="new-username">Username</Label>
                <Input className="mt-2" id="new-username" placeholder="New username" type="text" />
              </form>
            </div>
            <div className="password space-y-3">
              <form>
                <Label htmlFor="new-password">Password</Label>
                <Input className="mt-2" id="new-password" placeholder="New password" type="password" />
              </form>
              <form>
                <Input id="confirm-new-password" placeholder="Confirm new password" type="password" />
              </form>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction >Update your account</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
