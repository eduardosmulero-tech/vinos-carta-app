import type { ReactNode } from 'react';

interface HighlightProps {
  text: string;
  query: string;
}

function Highlight({ text, query }: HighlightProps) {
  if (!query.trim()) {
    return <>{text}</>;
  }

  const normalizedQuery = query.toLowerCase();
  const lowerText = text.toLowerCase();
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (let i = 0; i <= lowerText.length - normalizedQuery.length; i++) {
    if (lowerText.substring(i, i + normalizedQuery.length) === normalizedQuery) {
      if (i > lastIndex) {
        parts.push(text.substring(lastIndex, i));
      }
      parts.push(
        <mark
          key={key++}
          className="rounded-sm bg-primary/15 px-0.5 font-semibold text-primary"
        >
          {text.substring(i, i + normalizedQuery.length)}
        </mark>
      );
      lastIndex = i + normalizedQuery.length;
      i = lastIndex - 1;
    }
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts}</>;
}

export default Highlight;
