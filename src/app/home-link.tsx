import Link from "next/link";

export default function HomeLink() {
  return (
    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        Amalgama
      </span>
    </Link>
  );
}
