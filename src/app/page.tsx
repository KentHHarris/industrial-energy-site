import Link from "next/link";
import TeslaLogo from "@/components/shared/TeslaLogo";
import TeslaVideo from "@/components/shared/TeslaVideo";
import GithubLink from "@/components/shared/GithubLink";

export default function Home() {
    return (
        <main className="relative w-full h-screen">
            <header className="absolute p-8 z-20 w-full flex justify-between items-center">
                <TeslaLogo />
                <GithubLink />
            </header>
            <div className="text-black absolute z-10 w-full h-3/4 flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-bold text-center">Tesla Industrial Energy Battery Site</h1>
                <Link href="/configuration" className="border-2 border-black rounded p-2 font-bold">Get Started</Link>
            </div>
            <TeslaVideo />
        </main>
    );
}