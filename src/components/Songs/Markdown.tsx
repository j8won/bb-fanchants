'use client';
import { MDXRemote } from 'next-mdx-remote';

export default function Markdown({ source }) {
  return <MDXRemote {...source} />;
}
