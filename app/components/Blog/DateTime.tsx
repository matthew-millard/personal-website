interface DateTimeProps {
  dateTime: string;
  date: string;
}

export default function DateTime({ dateTime, date }: DateTimeProps) {
  return (
    <time dateTime={dateTime} className="text-color-muted">
      {date}
    </time>
  );
}
