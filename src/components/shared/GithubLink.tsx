import Link from "next/link";

const GithubLink: React.FC = () => (
    <Link
        href={process.env.GITHUB_REPO ?? '/'}
        className="font-semibold uppercase underline text-md"
        target="_blank"
    >Github</Link>
);

export default GithubLink;