import Image from "next/image";

export function HoverImageInfo({date, generator, url, user_id, likes}: { date: string, generator: string, url: string, user_id: string, likes: number}) {
  return (
    <>
      <Image alt={generator} className="peer hover:opacity-50" src={url} width={512} height={512} />
      <div className="peer-hover:opacity-100 opacity-0 absolute text-white bottom-0 p-4">
        <p className="mb-2">{generator}</p>
        <p>{user_id}</p>
        <p>{new Date(date).toLocaleString()}</p>
      </div>
      <p className="peer-hover:opacity-100 opacity-0 absolute text-white bottom-0 right-0 p-4">{likes} ❤️</p>
    </>
  )
}
