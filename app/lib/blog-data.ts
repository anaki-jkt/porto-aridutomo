const CMS_API_URL = process.env.CMS_API_URL || "http://porto-cms-api:3001";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[]; // parsed dari JSON string
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readingTime: number;
}

interface CmsBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string; // JSON string dari CMS
  publishedAt: string;
  readingTime: number;
  published: boolean;
}

function mapPost(p: CmsBlogPost): BlogPost {
  let tags: string[] = [];
  try { tags = JSON.parse(p.tags || "[]"); } catch { tags = []; }
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    coverImage: p.coverImage || "",
    category: p.category,
    tags,
    author: { name: "Ari Dwi Utomo", avatar: "/avatar.jpg" },
    publishedAt: p.publishedAt,
    readingTime: p.readingTime,
  };
}

async function fetchPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${CMS_API_URL}/api/posts`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data: CmsBlogPost[] = await res.json();
    return data.map(mapPost);
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await fetchPosts();
  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const res = await fetch(`${CMS_API_URL}/api/posts/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return undefined;
    const data: CmsBlogPost = await res.json();
    return mapPost(data);
  } catch {
    return undefined;
  }
}

export async function getRecentPosts(count: number = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.slice(0, count);
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await fetchPosts();
  return [...new Set(posts.map((p) => p.category))];
}

export async function getAllTags(): Promise<string[]> {
  const posts = await fetchPosts();
  return [...new Set(posts.flatMap((p) => p.tags))];
}
