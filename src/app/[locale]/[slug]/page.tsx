import { LocaleType } from '../../../../lib/constants/LOCALE';
import { getSongBySlug } from '../../../../lib/utils/mdx';
import Markdown from '@/components/Songs/Markdown';

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
    <div className="overflow-y-auto">
      {slug} {locale}
      <Markdown source={mdxSource} />
    </div>
  );
}
