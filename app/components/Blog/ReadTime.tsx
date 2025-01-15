interface ReadTimeProps {
  fontSize?: "text-xs" | "text-sm" | "text-base" | "text-lg" | "text-xl";
  text: string;
}

export default function ReadTime({
  fontSize = "text-sm",
  text,
}: ReadTimeProps) {
  return <p className={`${fontSize} font-medium text-color-muted`}>{text}</p>;
}
