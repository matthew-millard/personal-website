interface ReadTimeProps {
  fontSize?: "text-xs" | "text-sm" | "text-base" | "text-lg" | "text-xl";
  fontWeight?:
    | "font-thin"
    | "font-light"
    | "font-normal"
    | "font-medium"
    | "font-semibold"
    | "font-bold"
    | "font-black";
  text: string;
}

export default function ReadTime({
  fontSize = "text-sm",
  fontWeight = "font-normal",
  text,
}: ReadTimeProps) {
  return <p className={`${fontSize} ${fontWeight} text-color-muted`}>{text}</p>;
}
