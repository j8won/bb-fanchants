import { LocaleType } from '@/lib/constants/LOCALE';
import { getSongBySlug } from '@/lib/utils/mdx';
import Markdown from '@/components/songs/Markdown';
import Image from 'next/image';
import Link from 'next/link';
import Notice from '@/components/songs/Notice';

interface Params {
  params: {
    slug: string;
    locale: LocaleType;
  };
}

export default async function Page({ params: { slug, locale } }: Params) {
  const { metadata, mdxSource } = await getSongBySlug(locale, slug);

  console.log(metadata);
  return (
    <div className="overflow-y-auto px-5 pb-6">
      <div className="flex mt-4">
        <Link href={metadata.musicUrl} target="_blank" className="relative">
          <Image
            src={metadata.imageUrl}
            width="150"
            height="150"
            alt={`${metadata.title} 앨범 커버`}
            className="rounded"
          />
          <Image
            width="60"
            height="60"
            src="https://img.icons8.com/ios-filled/60/ffffff/play-button-circled--v1.png"
            alt="play-button-circled--v1"
            className="opacity-75 absolute top-[50px] left-[50px]"
          />
        </Link>

        <div className="pl-4">
          <h2>{metadata.title}</h2>
          <p>{metadata.artist}</p>
          <p>{new Date(metadata.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="mt-6 mb-4 p-4 rounded bg-gray5-light-bg">
        <Notice locale={locale} />
      </div>
      <Markdown source={mdxSource} />
    </div>
  );
}
