interface Props {
  descriptor: string;
  setDescriptor: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  action: string;
  setAction: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function Input({
  descriptor,
  setDescriptor,
  action,
  setAction
}: Props) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="flex items-center text-xl text-white">
        Describe Your Cat
      </h2>
      <textarea
        value={descriptor}
        className="m-2 h-12 p-2 placeholder:text-black"
        placeholder="grumpy abyssinian"
        onChange={(event) => setDescriptor(event)}
      />
      <h2 className="flex items-center text-xl text-white">
        and optionally, what it is doing
      </h2>
      <textarea
        value={action}
        className="m-2 h-12 p-2 placeholder:text-black"
        placeholder="riding a bicycle"
        onChange={(event) => setAction(event)}
      />
    </div>
  );
}
