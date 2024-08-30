'use client';
import { MDXRemote } from 'next-mdx-remote';

export default function Markdown({ source }: { source: any }) {
  return <MDXRemote {...source} />;
}
