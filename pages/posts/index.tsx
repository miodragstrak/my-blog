import { getSortedPosts } from '../../lib/posts';
import Link from 'next/link';
import type { Post } from '../../types/Post';
type Props = {
  posts: Post[];
};

export default function AllPostsPage({ posts }: Props) {
  return (
    <>
      <main className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">All Posts</h1>
        {posts.map((post) => (
          <div key={post.slug} className="mb-4">
            <h2 className="text-xl font-semibold">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-sm text-gray-500">{post.date}</p>
          </div>
        ))}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = getSortedPosts();
  return {
    props: { posts },
  };
}
