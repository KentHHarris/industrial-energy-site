import Image from "next/image";
import Link from "next/link";

const TeslaLogo = ({ href = '/' }: { href?: string; }) => (
    <Link href={href}>
        <Image
            src="/tesla-text.svg"
            alt="Tesla Logo"
            width={150}
            height={150}
            className="p-2"
        />
    </Link>
);

export default TeslaLogo;