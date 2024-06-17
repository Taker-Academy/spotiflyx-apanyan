import { mutate } from 'swr';
import { Media } from '@/app/types';
import { Button } from "@/components/ui/button";

const DeleteMedia: React.FC<{ media: Media }> = ({ media }) => {
    async function deleteMedia(id: number) {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://spotiflyx.xyz:8080/media/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('An error occurred while deleting the media.');
        }

        const data = await response.json();

        if (!data.ok) {
            throw new Error(data.error);
        }

        // Revalidate the data after a media is deleted
        mutate(['http://spotiflyx.xyz:8080/media/me', token]);
    }

    return (
        <Button variant="destructive" onClick={() => deleteMedia(media.id)}>
            Delete {media.type == "music" ? "song" : "video"}
        </Button>
    );
};

export default DeleteMedia;
