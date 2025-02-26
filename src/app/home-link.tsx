import Link from "next/link";

export default function HomeLink() {
  return (
    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <span className="font-medium block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
        Inicio
      </span>
    </Link>
  );
}
