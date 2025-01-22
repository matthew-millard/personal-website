import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export interface CodeBlockProps {
  children: string;
  language?: string;
}

export default function CodeBlock({
  children,
  language = "tsx",
}: CodeBlockProps) {
  return (
    <div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ borderRadius: "6px" }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
