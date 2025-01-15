interface DateTimeProps {
  fontSize?: "text-xs" | "text-sm" | "text-base" | "text-lg" | "text-xl";
  fontWeight?:
    | "font-thin"
    | "font-light"
    | "font-normal"
    | "font-medium"
    | "font-semibold"
    | "font-bold"
    | "font-black";
  dateTime: string;
  date: string;
}

export default function DateTime({
  fontSize = "text-xs",
  fontWeight = "font-normal",
  dateTime,
  date,
}: DateTimeProps) {
  return (
    <time
      dateTime={dateTime}
      className={`${fontSize} ${fontWeight} font- text-color-muted`}
    >
      {date}
    </time>
  );
}
