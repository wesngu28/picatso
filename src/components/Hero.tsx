import Image from "next/image";

export function Hero({}) {
  return (
    <div className="grid grid-cols-2 gap-8 items-center">
      <div className="flex flex-col">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Pawblo <span className="text-[hsl(280,100%,70%)]">Picatso</span>
      </h1>
      <p className="mt-4 text-xl font-thin text-white tracking-tight">
        Feline inspired? Transform your ideas into pawsome and meow-nificent AI cat art with DALL-E  2!
      </p>
      </div>
      <Image className="max-w-full" alt={"angry abysinnian cat riding a bicycle"} src="/icon.png" width={512} height={512} />
    </div>
  );
}
