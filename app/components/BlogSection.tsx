"use client";

import { useState } from "react";
import Link from "next/link";
import { getRecentPosts, getAllCategories, type BlogPost } from "../lib/blog-data";

// Category color mapping
const categoryColors: { [key: string]: string } = {
  "Mobile Development": "bg-purple-100 text-purple-700",
  Backend: "bg-green-100 text-green-700",
  Frontend: "bg-blue-100 text-blue-700",
  DevOps: "bg-orange-100 text-orange-700",
  default: "bg-gray-100 text-gray-700",
};

function BlogCard({ post }: { post: BlogPost }) {
  const categoryColor = categoryColors[post.category] || categoryColors.default;

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
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
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
          {post.title}
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

export default function BlogSection() {
  const recentPosts = getRecentPosts(3);
  const categories = getAllCategories();

  return (
    <section id="blog" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-linear-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            📝 Blog & Articles
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Sharing Knowledge
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Tutorial, tips & tricks, dan pengalaman saya dalam dunia programming.
            Mari belajar bersama!
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium shadow-lg shadow-blue-600/25">
            Semua
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-white text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all"
          >
            Lihat Semua Artikel
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -z-10" />
    </section>
  );
}
