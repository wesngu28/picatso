import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export function Navbar() {
  const { user } = useUser()

  return (
    <div className="absolute top-0 flex h-12 w-full items-center justify-between bg-purple-800 p-4">
      <div className="flex gap-16">
        <p>OpenCV</p>
        <Link href={"/gallery"}>Browse Creations</Link>
      </div>
      <div>
        { user && user.email ?
          <Link href="/api/auth/logout">Sign Out</Link>
          :
          <Link href="/api/auth/login">Sign In</Link>
        }
      </div>
    </div>
  );
}
