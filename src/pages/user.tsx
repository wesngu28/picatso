import { useUser } from "@auth0/nextjs-auth0/client";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Navbar } from "~/components/Navbar";
import { supabase } from "~/utils/supabase";

const Home: NextPage = () => {
  const { user } = useUser();
  const [images, setImages] = useState(
    [] as { generator: string; url: string; user_id: string }[]
  );
  useEffect(() => {
    async function getAllImages() {
      if (!user || !user.nickname) return;
      const { data: images }: PostgrestSingleResponse<{ [x: string]: any }[]> =
        await supabase.from("Images").select().eq("user_id", user.nickname);
      if (images) {
        const imageArr: { generator: string; url: string; user_id: string }[] =
          [];
        images.forEach((element) => {
          imageArr.push(
            element as { generator: string; url: string; user_id: string }
          );
        });
        setImages(imageArr);
      }
    }
    void getAllImages();
  }, [user]);
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Navbar />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h2 className="mt-24 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Hello {" "}
            <span className="text-[hsl(280,100%,70%)]">{user?.nickname}</span>
          </h2>
          <p className="text-3xl text-white">These are your cats.</p>
          <div className="flex max-w-xl items-center justify-center gap-4">
            {images &&
              images.map((img) => (
                <img key={img.url} src={img.url} width={1024} height={1024} />
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;