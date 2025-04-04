import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <Link
        href={"/editor/12"}
        className="px-5 py-3 bg-blue-400 rounded-2xl font-bold text-black"
      >
        Go to editor
      </Link>
    </div>
  );
}
