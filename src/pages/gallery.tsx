import { HoverImageInfo } from '~/components/HoverImageInfo';
import { type NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "~/components/Navbar";
import { api } from "~/utils/api";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Meta } from '~/components/Meta';
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { supabase } from '~/utils/supabase';

const Home: NextPage = () => {
  const toasts = useRef<(HTMLDivElement | null)[]>([]);
  const { data: images, refetch } = api.images.getAll.useQuery();
  const mutation = api.images.updateLikes.useMutation();
  const { user } = useUser()
  const [heart, setHeart] = useState("❤️")
  const [paginator] = useAutoAnimate()
  useEffect(() => {
    function subscribe() {
      console.log('wungin')
      supabase.channel('public:Images').on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Images' },
        () => {
          refetch()
            .then(() => {
              console.log('Refetch successful');
            })
            .catch((error) => {
              console.error('Refetch failed');
            });
        }
      )
      .subscribe()
    }
    return(() => subscribe())
  })

  function handleDoubleClick(img: imageEntry, i: number) {
    if(user && user.nickname) {
      if ((img.likers as string[]).includes(user.nickname)) {
        setHeart("💔")
      } else {
        setHeart("❤️")
      }
      mutation.mutate(
        {
          identifier: img.url,
          likers: img.likers,
          user: user.nickname,
          likes: img.likes
        }
      )
      const toast = toasts.current[i]
      if(toast) {
        toast.classList.add('opacity-100')
        toast.classList.remove('opacity-0')
        setTimeout(() => {
            if(toast) {
              toast.classList.remove('opacity-100')
              toast.classList.add('opacity-0')
            }
        }, 1250);
      }
    }
  }

  return (
    <>
      <Meta title={"Cat Gallery"} />
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Navbar     />
        <div ref={paginator} className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-24 gap-4">
          {images && images.map((img, i) =>
            <div onDoubleClick={() => handleDoubleClick(img, i)}
            className="relative group" key={i}>
              <HoverImageInfo date={img.created_at} likes={img.likes} url={img.url} generator={img.generator} user_id={img.user_id} />
              <div ref={(el) => { toasts.current[i] = el; }}
                className="p-2 bg-transparent absolute top-1/2 left-1/2 opacity-0 transition-opacity duration-1000 ease-in text-2xl">
                {heart}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};


export const getServerSideProps = withPageAuthRequired()

export default Home;