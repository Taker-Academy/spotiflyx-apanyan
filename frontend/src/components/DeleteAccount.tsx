import { useState } from 'react';
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
import logout from '@/app/auth/logout';
import { Toaster, toast } from 'sonner'

export default function DeleteAccount({ token }: { token: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteAccount = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('https://api.spotiflyx.xyz/user/remove', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.ok) {
                toast.success("Account deleted successfully");
                setTimeout(logout, 3000);
            }
        } catch (error) {
            console.error('An error occurred while deleting the account:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog>
            <Toaster richColors position="top-center" />
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action is <span className="text-red-500">irreversible</span>. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={handleDeleteAccount}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Deleting...' : 'Delete your account'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
