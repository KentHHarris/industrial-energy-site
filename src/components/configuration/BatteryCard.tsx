/**
 * Component for displaying individual battery details
 */
import Image from "next/image";
import React from "react";
import type { Battery } from "@/types";
import BatteryCardQuantity from "./BatteryCardQuantity";

type BatteryCardPorps = { battery: Battery; };
type BatteryImageProps = BatteryCardPorps & React.HTMLAttributes<HTMLImageElement>;

const BatteryImage: React.FC<BatteryImageProps> = ({ battery, ...props }) => {
    let src: string;
    switch (battery.name) {
        case 'Powerpack':
            src = "/device-images/Powerpack.webp";
            break;
        case 'Megapack': case 'Megapack 2':
            src = "/device-images/Megapack.webp";
            break;
        case 'Megapack 2XL':
            src = "/device-images/Megapack2XL.webp";
            break;
        default:
            src = "/tesla-logo.svg";
            break;
    }
    return (
        <Image
            src={src}
            alt={`${battery.name} image`}
            width={128}
            height={128}
            {...props}
        />
    );
};

const BatteryCard: React.FC<BatteryCardPorps> = ({ battery }) => {
    return (
        <div className="flex flex-col">
            {/* Desktop */}
            <div className="hidden lg:flex flex-col items-center">
                <p className="text-xl font-semibold pb-4">{battery.name}</p>
                <BatteryImage battery={battery} className="rounded-lg object-scale-down size-40" />
                <p className="text-sm">Released in {battery.releaseDateYear}.</p>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center justify-between">
                <BatteryImage battery={battery} className="rounded-lg object-fit size-12 overflow-hidden border border-blue-900 shadow-lg" />
                <span className="text-pretty w-32 text-center text-sm font-bold">{battery.name}</span>

                <span className="bg-blue-400 rounded-lg size-8 shadow-xl border border-blue-900 flex items-center justify-center">
                    <BatteryCardQuantity batteryId={battery.id} />
                </span>
            </div>
        </div>
    );
};

export default BatteryCard;