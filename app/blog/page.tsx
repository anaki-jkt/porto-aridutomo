import Link from "next/link";
import { getAllPosts, getAllCategories, type BlogPost } from "../lib/blog-data";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Ari Dwi Utomo",
  description:
    "Tutorial programming, tips & tricks, dan artikel tentang web development, mobile development, dan teknologi terbaru.",
  openGraph: {
    title: "Blog | Ari Dwi Utomo",
    description:
      "Tutorial programming, tips & tricks, dan artikel tentang web development, mobile development, dan teknologi terbaru.",
    type: "website",
  },
};

// Category color mapping
const categoryColors: { [key: string]: string } = {
  "Mobile Development": "bg-purple-100 text-purple-700 border-purple-200",
  Backend: "bg-green-100 text-green-700 border-green-200",
  Frontend: "bg-blue-100 text-blue-700 border-blue-200",
  DevOps: "bg-orange-100 text-orange-700 border-orange-200",
  default: "bg-gray-100 text-gray-700 border-gray-200",
};

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const categoryColor = categoryColors[post.category] || categoryColors.default;

  if (featured) {
    return (
      <article className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-1 md:col-span-2 md:grid md:grid-cols-2">
        {/* Cover Image */}
        <div className="relative h-64 md:h-full bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-9xl font-bold">
              {post.category.charAt(0)}
            </span>
          </div>
          {/* Featured Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-center">
          {/* Category */}
          <span className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-medium mb-4 ${categoryColor}`}>
            {post.category}
          </span>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
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

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Read More */}
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all"
          >
            Baca Artikel
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
      {/* Cover Image */}
      <div className="relative h-48 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/30 text-6xl font-bold">
            {post.category.charAt(0)}
          </span>
        </div>
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColor}`}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(post.publishedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readingTime} min read
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read More */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all"
        >
          Baca Selengkapnya
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const allPosts = getAllPosts();
  const categories = getAllCategories();
  const [featuredPost, ...otherPosts] = allPosts;

  return (
    <>
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Beranda
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Blog & Articles
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Tutorial programming, tips & tricks, dan berbagi pengalaman dalam dunia pengembangan software.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm font-medium shadow-lg shadow-blue-600/25 hover:shadow-xl transition-shadow">
            Semua Artikel
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className="px-5 py-2.5 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-12 text-center">
          <div className="px-6 py-3 bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl">
            <div className="text-2xl font-bold text-gray-900">{allPosts.length}</div>
            <div className="text-sm text-gray-600">Total Artikel</div>
          </div>
          <div className="px-6 py-3 bg-linear-to-r from-green-50 to-teal-50 rounded-2xl">
            <div className="text-2xl font-bold text-gray-900">{categories.length}</div>
            <div className="text-sm text-gray-600">Kategori</div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Post */}
          {featuredPost && <BlogCard post={featuredPost} featured />}
          
          {/* Other Posts */}
          {otherPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Empty State */}
        {allPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Belum Ada Artikel</h3>
            <p className="text-gray-600">Artikel akan segera hadir. Stay tuned!</p>
          </div>
        )}
      </div>
    </main>
    <Footer />
    </>
  );
}
