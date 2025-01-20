import { Temporal } from "@js-temporal/polyfill";

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
}

export default function DateTime({
  fontSize = "text-xs",
  fontWeight = "font-normal",
  dateTime,
}: DateTimeProps) {
  const zonedDateTime = Temporal.ZonedDateTime.from(`${dateTime}[UTC]`);
  const formattedDate = `${zonedDateTime.day} ${zonedDateTime.toLocaleString("default", { month: "short" })}, ${zonedDateTime.year}`;

  return (
    <time
      dateTime={dateTime}
      className={`${fontSize} ${fontWeight} font- text-color-muted`}
    >
      {formattedDate}
    </time>
  );
}
