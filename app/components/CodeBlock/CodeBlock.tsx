import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "~/hooks";

export interface CodeBlockProps {
  children: string; // Code block content as a string
  className?: string; // Language will be passed via className (e.g., `language-js`)
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  // Extract language from className (e.g., "language-js" -> "js")
  const language = className?.replace("language-", "") || "plaintext";
  const theme = useTheme();
  const backgroundColor = theme === "light" ? "#18181b" : "#27272a";

  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        borderRadius: "6px",
        border: "1px solid rgba(161, 161, 170, 0.25)",
        padding: "32px",
        marginTop: "40px",
        backgroundColor,
      }}
    >
      {children.trim()}
    </SyntaxHighlighter>
  );
}
