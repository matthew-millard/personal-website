import {
  Prism as SyntaxHighlighter,
  type SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeBlockProps extends SyntaxHighlighterProps {
  children: string;
  language?: "typescript" | "javascript" | "jsx" | "tsx" | "css";
}

export default function CodeBlock({
  children,
  language = "tsx",
  ...props
}: CodeBlockProps) {
  return (
    <div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        {...props}
        customStyle={{ borderRadius: "6px" }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
