import { useUser } from "@auth0/nextjs-auth0/client";
import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { Hero } from "~/components/Hero";
import { Input } from "~/components/Input";
import { Meta } from "~/components/Meta";
import { Navbar } from "~/components/Navbar";
import { Result } from "~/components/Result";

const Home: NextPage = () => {
  const [descriptor, setDescriptor] = useState("");
  const [action, setAction] = useState("");
  const [showInputs, setShowInputs] = useState(true)
  const handleImagePresence = (bool: boolean) => setShowInputs(bool)
  const handleDescriptionInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => setDescriptor(event.target.value);
  const handleActionInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => setAction(event.target.value);
  const { user } = useUser()

  return (
    <>
      <Meta title={"Picatso"} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Navbar     />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 max-w-3xl">
          <Hero />
          {
            user?.name ?
            <>
              {showInputs && <Input descriptor={descriptor} setDescriptor={handleDescriptionInput} action={action} setAction={handleActionInput} /> }
              <Result
                descriptor={descriptor} action={action} show={showInputs} shower={handleImagePresence}
              />
            </>
            : <Link href="/api/auth/login"
              className="p-4 bg-purple-600 rounded-full text-2xl text-white font-thin tracking-tighter">
              Sign In to Make the Cats Cat
              </Link>
          }
        </div>
      </main>
    </>
  );
};

export default Home;