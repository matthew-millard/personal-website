interface PProps {
  children: React.ReactNode;
  marginTop?: "mt-2" | "mt-3" | "mt-4" | "mt-6" | "mt-8";
}

export default function P({ children, marginTop = "mt-6" }: PProps) {
  return <p className={`text-base text-color ${marginTop}`}>{children}</p>;
}
