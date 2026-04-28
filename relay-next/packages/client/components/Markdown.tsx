import { unified } from "unified";
import remarkParse from "remark-parse";
import type { RootContent, Root } from "mdast";
import MermaidDiagram from "./MermaidDiagram";

function parse(markdown: string): Root {
  return unified().use(remarkParse).parse(markdown);
}

// Render Markdown on the server. Based on https://jordaneldredge.com/markdown-react/
// Note that we support Mermaid diagrams as a custom extension, which requires
// client-side rendering. When the server encounters a Mermaid code block, it
// renders a placeholder component that is replaced with the actual diagram on
// the client. That means this component can be a heavy JS bundle.

export default function Markdown({ content }: { content: string }) {
  const ast = parse(content);
  return <MarkdownChildren nodes={ast.children} />;
}

function MarkdownChildren({ nodes }: { nodes: RootContent[] }) {
  return nodes.map((node, i) => <MarkdownNode node={node} key={i} />);
}

function MarkdownNode({ node }: { node: RootContent }) {
  switch (node.type) {
    case "text":
      return node.value;
    case "paragraph":
      return (
        <p>
          <MarkdownChildren nodes={node.children} />
        </p>
      );
    case "heading": {
      const Tag = `h${node.depth}` as const;
      return (
        <Tag>
          <MarkdownChildren nodes={node.children} />
        </Tag>
      );
    }
    case "strong":
      return (
        <strong>
          <MarkdownChildren nodes={node.children} />
        </strong>
      );
    case "emphasis":
      return (
        <em>
          <MarkdownChildren nodes={node.children} />
        </em>
      );
    case "delete":
      return (
        <del>
          <MarkdownChildren nodes={node.children} />
        </del>
      );
    case "link":
      return (
        <a href={node.url} target="_blank" rel="noopener noreferrer">
          <MarkdownChildren nodes={node.children} />
        </a>
      );
    case "image":
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={node.url} alt={node.alt ?? ""} />;
    case "blockquote":
      return (
        <blockquote>
          <MarkdownChildren nodes={node.children} />
        </blockquote>
      );
    case "list": {
      const children = <MarkdownChildren nodes={node.children} />;
      return node.ordered ? (
        <ol className="list-decimal pl-6">{children}</ol>
      ) : (
        <ul className="list-disc pl-6">{children}</ul>
      );
    }
    case "listItem":
      return (
        <li>
          <MarkdownChildren nodes={node.children} />
        </li>
      );
    case "code":
      if (node.lang === "mermaid") {
        return <MermaidDiagram code={node.value} />;
      }
      return (
        <pre>
          <code>{node.value}</code>
        </pre>
      );
    case "inlineCode":
      return <code>{node.value}</code>;
    case "thematicBreak":
      return <hr />;
    case "break":
      return <br />;
    default:
      return null;
  }
}
