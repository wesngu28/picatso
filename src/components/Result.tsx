import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { api } from "~/utils/api";

interface Props {
  descriptor: string;
  action: string;
}

export function Result({ descriptor, action }: Props) {
  const [img, setImg] = useState("");
  const { user } = useUser()
  const mutation = api.example.addImage.useMutation({onSuccess: (res) => {
    setImg(res)
  }});
  function buildImage() {
    if (!user || !user.nickname) {
      return;
    }
    console.log(user.name)
    mutation.mutate({
      generator: `a ${descriptor} cat ${action}`,
      user_id: user.nickname
    })
  }
  return (
    <>
      <button
        onClick={buildImage}
        className="bg-purple-600 p-2 text-xl font-semibold tracking-tighter text-white"
      >
        Generate a {descriptor} cat {action}
      </button>
      <img src={img} />
    </>
  );
}
