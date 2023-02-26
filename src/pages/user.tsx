import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { type NextPage } from "next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HoverImageInfo } from "~/components/HoverImageInfo";
import { Meta } from "~/components/Meta";
import { Navbar } from "~/components/Navbar";
import { getAllImages } from "~/utils/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Home: NextPage = () => {
  const { user } = useUser();
  const [images, setImages] = useState([] as imageEntry[]);
  const handleFetchedImages = (arr: imageEntry[]) => setImages(arr)
  const popout = useRef<HTMLDivElement | null>(null);
  const [modalpic, setModalpic] = useState({} as imageEntry)
  const [paginator] = useAutoAnimate()

  function handleClick(img: imageEntry) {
      if (popout.current) {
        popout.current.classList.toggle("hidden")
        setModalpic(img)
      }
  }

  useEffect(() => {
    void getAllImages(user, true, handleFetchedImages);
  }, [user]);
  return (
    <>
      <Meta title={`${user?.nickname ? `${user?.nickname} Gallery` : "User Gallery"}`} />
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Navbar />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h2 className="mt-24 text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Hello {" "}
            <span className="text-[hsl(280,100%,70%)]">{user?.nickname}</span>
          </h2>
          <p className="text-3xl text-white">These are your cats.</p>
          <div ref={paginator} className="grid grid-cols-1 sm:grid-cols-2 max-w-xl items-center justify-center gap-4">
            {images &&
              images.map((img) => (
                <div className="relative" key={img.url} onClick={() => handleClick(img)}>
                  <HoverImageInfo date={img.created_at} generator={img.generator} likes={img.likes} url={img.url} user_id={img.user_id} />
                </div>
              ))}
          </div>
        </div>
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => {
            if (popout.current) popout.current.classList.toggle("hidden");
          }}
          className="hidden fixed w-screen h-screen bg-[#000000e1]"
          ref={popout}>
            <div className="flex flex-col items-center justify-center h-full text-white font-semibold text-3xl">
              <Image width={512} height={512} alt={modalpic.generator} className="max-h-[50vh] opacity-100" src={modalpic.url} />
              <p className="mb-4">{modalpic.generator}</p>
              <p>Created by: <span className={"text-[hsl(280,100%,70%)]"}>{modalpic.user_id}</span></p>
              <p>{new Date(modalpic.created_at).toLocaleString()}</p>
              <p>{modalpic.likes} ❤️</p>
            </div>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = withPageAuthRequired()

export default Home;
