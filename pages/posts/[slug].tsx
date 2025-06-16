import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { marked } from 'marked';

type Props = {
  content: string;
  title: string;
};

export default function PostPage({ content, title }: Props) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;

  const markdownWithMeta = fs.readFileSync(path.join('posts', `${slug}.md`), 'utf-8');
  const { data, content } = matter(markdownWithMeta);

  return {
    props: {
      content: marked(content),
      title: data.title ?? slug,
    },
  };
};
