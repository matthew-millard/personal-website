import { useTheme } from "~/hooks";

export default function Code({
  ...props
}: React.ComponentPropsWithoutRef<"code">) {
  const theme = useTheme();
  const backgroundColor = theme === "light" ? "bg-zinc-900" : "bg-zinc-800";

  return (
    <code
      {...props}
      className={`${backgroundColor} rounded border border-edge-muted-extra px-1 py-0.5 font-mono text-sm text-zinc-200`}
    />
  );
}
