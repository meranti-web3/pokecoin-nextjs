import Link from "next/link";
import { useRouter } from "next/router";

import Button from "./Button";

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between h-16 bg-gray-800 rounded-t-md">
      <div className="flex items-center p-4 rounded-t-md grow">
        <h1 className="text-3xl font-bold text-white flex-shrink-0">
          PokeCoin
        </h1>
        <nav className="ml-10 flex items-baseline space-x-4">
          <Link href="/">
            <a className="text-white block px-3 py-2 text-sm font-medium hover:underline">Browse Tokens</a>
          </Link>
          <Button onClick={() => router.push("/createToken")}>+ New</Button>
        </nav>
      </div>
    </header>
  );
}
