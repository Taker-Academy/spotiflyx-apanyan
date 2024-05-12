import { SignupForm } from "@/components/SignupForm";
import { Link } from 'next-view-transitions';;

export default function Signup() {
    return (
        <>
            <div
                className="absolute cursor-pointer hover:text-slate-300 transition-all duration-200 text-white text-2xl font-bold flex justify-between items-center mx-16 mt-8"
            >
                <Link href="/"><h2>Spotiflyx</h2></Link>
            </div>
            <div className="h-dvh flex justify-center items-center">
                <SignupForm />
            </div>
        </>
    );
}
