'use client';
import { MDXRemote } from 'next-mdx-remote';

export default function Markdown({ source }: { source: any }) {
  return (
    <div className="whitespace-pre-wrap text-body-lg leading-loose">
      <MDXRemote
        {...source}
        components={{
          em: ({ children }) => (
            <em className="text-primary-yellow not-italic">{children}</em>
          ),
          strong: ({ children }) => (
            <strong className="text-secondary-skyblue font-normal">
              {children}
            </strong>
          ),
        }}
      />
    </div>
  );
}
