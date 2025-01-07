interface Button {
  text: string;
}

export default function Button({ text }: Button) {
  return (
    <button
      type="button"
      className="bg-primary rounded-md px-3 py-2.5 text-white"
    >
      {text}
    </button>
  );
}
