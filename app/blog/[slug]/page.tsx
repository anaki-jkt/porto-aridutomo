import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts, getRecentPosts } from "../../lib/blog-data";
import CodeBlock from "../../components/CodeBlock";
import ShareButtons from "../../components/ShareButtons";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Ari Dwi Utomo",
    };
  }

  return {
    title: `${post.title} | Ari Dwi Utomo`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

// Simple markdown-like renderer for code blocks
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeContent = "";
  let codeLanguage = "";
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block start
    if (line.startsWith("```") && !inCodeBlock) {
      inCodeBlock = true;
      codeLanguage = line.slice(3).trim();
      codeContent = "";
      continue;
    }

    // Code block end
    if (line.startsWith("```") && inCodeBlock) {
      inCodeBlock = false;
      elements.push(
        <CodeBlock key={key++} language={codeLanguage} code={codeContent} />
      );
      continue;
    }

    // Inside code block
    if (inCodeBlock) {
      codeContent += line + "\n";
      continue;
    }

    // H2 heading
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    // H3 heading
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-xl font-bold text-gray-900 mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="text-gray-700 leading-relaxed mb-4">
        {line}
      </p>
    );
  }

  return elements;
}

// Category color mapping
const categoryColors: { [key: string]: string } = {
  "Mobile Development": "bg-purple-100 text-purple-700",
  Backend: "bg-green-100 text-green-700",
  Frontend: "bg-blue-100 text-blue-700",
  DevOps: "bg-orange-100 text-orange-700",
  default: "bg-gray-100 text-gray-700",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = getRecentPosts(3).filter((p) => p.slug !== slug);
  const categoryColor = categoryColors[post.category] || categoryColors.default;

  return (
    <>
    <main className="min-h-screen pt-24 pb-20">
      <article className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          {/* Category */}
          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${categoryColor}`}>
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {post.author.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900">{post.author.name}</div>
                <div className="text-sm">Full Stack Developer</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              {/* <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readingTime} min read
              </span> */}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Cover Image */}
        <div className="relative h-64 md:h-96 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl overflow-hidden mb-10">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-9xl font-bold">
              {post.category.charAt(0)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {renderContent(post.content)}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          {/* Author & Share */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {post.author.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">{post.author.name}</div>
                <div className="text-gray-600">Full Stack & Mobile Developer</div>
              </div>
            </div>
            <ShareButtons title={post.title} slug={post.slug} />
          </div>

          {/* Related Posts */}
          {recentPosts.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Artikel Lainnya</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {recentPosts.slice(0, 2).map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group p-6 bg-gray-50 rounded-xl hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 transition-colors"
                  >
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[relatedPost.category] || categoryColors.default}`}>
                      {relatedPost.category}
                    </span>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    {/* <div className="text-sm text-gray-500 mt-2">
                      {relatedPost.readingTime} min read
                    </div> */}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </footer>
      </article>
    </main>
    <Footer />
    </>
  );
}
