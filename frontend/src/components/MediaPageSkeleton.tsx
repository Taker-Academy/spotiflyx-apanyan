import { Skeleton } from "@/components/ui/skeleton"

export default function MediaPageSkeleton() {
    return (
        <main className='ml-6'>
            <Skeleton className="h-[30px] w-[200px] mb-12" />
            <section className='flex justify-between'>
                <Skeleton className="h-[352px] w-[900px]" />
                <div className='flex flex-col justify-between gap-2 mr-8'>
                    <div>
                        <Skeleton className="h-[20px] w-[200px]" />
                        <Skeleton className="h-[20px] w-[200px]" />
                    </div>
                    <div>
                        <Skeleton className="h-[20px] w-[200px]" />
                    </div>
                </div>
            </section>
        </main>
    );
}