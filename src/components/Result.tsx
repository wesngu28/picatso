import { useUser } from "@auth0/nextjs-auth0/client";
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
  const [img, setImg] = useState("");
  const { user } = useUser();
  const mutation = api.images.addImage.useMutation({
    onSuccess: (res) => {
      if (res) setImg(res);
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
    <>
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
            className="bg-purple-600 p-2 text-xl font-semibold tracking-tighter text-white"
          >
            Generate a new cat
          </button>
          <Image alt={`${descriptor} cat ${action}`} src={img} width={512} height={512} />
          <p className="text-white text-xl font-semibold tracking-tight">{descriptor} cat {action}</p>
        </>
      )}
    </>
  );
}
