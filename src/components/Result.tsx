import { useUser } from "@auth0/nextjs-auth0/client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/utils/api";

interface Props {
  descriptor: string;
  action: string;
  show: boolean;
  shower: (bool: boolean) => void;
}

export function Result({ descriptor, action, show, shower }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState("");
  const { user } = useUser();
  const [imageHolder] = useAutoAnimate()
  const mutation = api.images.addImage.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (res) => {
      if (res) {
        setImg(res);
        setIsLoading(false);
      }
    },
  });
  function buildImage() {
    if (!user || !user.nickname) {
      return;
    }
    mutation.mutate({
      generator: `a ${descriptor} cat ${action}`,
      user_id: user.nickname,
    });
    shower(false);
  }
  return (
    <div className="flex flex-col gap-4 items-center" ref={imageHolder}>
      {show ? (
        <button
          onClick={buildImage}
          className="bg-purple-600 p-2 text-xl font-semibold tracking-tighter text-white"
        >
          Generate a {descriptor} cat {action}
        </button>
      ) : (
        <>
          <button
            onClick={() => shower(true)}
            className="bg-purple-600 p-2 w-max text-xl font-semibold tracking-tighter text-white"
          >
            Generate a new cat
          </button>
          {isLoading ? (
          <>
            <Image alt={"cats running on treadmill"} src="/server-cats.gif" width={512} height={512}/>
            <p className="text-white text-xl font-semibold tracking-tight">Server cats are computing your image...</p>
          </>
        ) : (
          <>
              <Image alt={`${descriptor} cat ${action}`} src={img} width={512} height={512} />
            <p className="text-white text-xl font-semibold tracking-tight">{descriptor} cat {action}</p>
          </>
        )}
        </>
      )}
    </div>
  );
}
