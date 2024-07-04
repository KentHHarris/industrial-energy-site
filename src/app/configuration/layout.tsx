import GithubLink from "@/components/shared/GithubLink";
import TeslaLogo from "@/components/shared/TeslaLogo";
import React from "react";

export default function ComposerLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="composer-container relative">
            <header className="p-8 pb-0 w-full flex items-start justify-between absolute z-20">
                <div className="hidden md:block">
                    <TeslaLogo />
                </div>
                <h2 className="text-xl lg:text-2xl font-semibold text-balance text-center capitalize w-40 md:w-80">Industrial Energy Battery Site Configuration</h2>
                <GithubLink />
            </header>
            {children}
        </div>
    );
}