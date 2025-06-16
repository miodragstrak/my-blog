import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { GetStaticProps } from 'next';

type Post = {
  slug: string;
  title: string;
};

type Props = {
  posts: Post[];
};

export default function Home({ posts }: Props) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Blog</h1>
      {posts.map((post) => (
        <div key={post.slug} className="mb-4">
          <Link href={`/posts/${post.slug}`} className="text-xl text-blue-600 hover:underline">
            {post.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const files = fs.readdirSync(path.join('posts'));

  const posts: Post[] = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
    const { data } = matter(markdownWithMeta);

    return {
      slug,
      title: data.title ?? slug,
    };
  });

  return {
    props: {
      posts,
    },
  };
};
