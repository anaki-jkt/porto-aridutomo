// Blog data - Replace this with your CMS API later
// This is a sample structure that your CMS should follow

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readingTime: number; // in minutes
}

// Sample blog posts - Replace with API call to your CMS
export const blogPosts: BlogPost[] = [
  
  {
    id: "1",
    slug: "membuat-nextjs-deploy-vercel-gratis",
    title: "Membuat Project Next.js dan Deploy Gratis ke Vercel",
    excerpt:
      "Tutorial lengkap membuat website Next.js dari nol dan cara deploy gratis ke Vercel. Cocok untuk pemula!",
    content: `
## Pendahuluan

Next.js adalah framework React yang powerful untuk membangun website modern. Dalam tutorial ini, kita akan membuat project Next.js dari awal dan deploy ke Vercel secara gratis!

## Langkah 1: Persiapan

Pastikan Anda sudah menginstall Node.js (versi 18 atau lebih baru). Cek versi dengan:

\`\`\`bash
node --version
npm --version
\`\`\`

## Langkah 2: Membuat Project Next.js

Buka terminal dan jalankan perintah berikut:

\`\`\`bash
npx create-next-app@latest my-website
\`\`\`

Anda akan ditanya beberapa pertanyaan, pilih sesuai preferensi:

\`\`\`
✔ Would you like to use TypeScript? Yes
✔ Would you like to use ESLint? Yes
✔ Would you like to use Tailwind CSS? Yes
✔ Would you like to use src/ directory? No
✔ Would you like to use App Router? Yes
✔ Would you like to customize the default import alias? No
\`\`\`

## Langkah 3: Jalankan Development Server

Masuk ke folder project dan jalankan:

\`\`\`bash
cd my-website
npm run dev
\`\`\`

Buka browser dan akses http://localhost:3000. Selamat! Website Next.js Anda sudah berjalan! 🎉

## Langkah 4: Edit Halaman Utama

Buka file \`app/page.tsx\` dan edit sesuai keinginan:

\`\`\`tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Selamat Datang di Website Saya! 👋
        </h1>
        <p className="text-gray-600">
          Dibuat dengan Next.js dan di-deploy ke Vercel
        </p>
      </div>
    </main>
  );
}
\`\`\`

## Langkah 5: Push ke GitHub

Pertama, buat repository baru di GitHub. Kemudian push kode Anda:

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/my-website.git
git push -u origin main
\`\`\`

## Langkah 6: Deploy ke Vercel

### Cara 1: Melalui Website Vercel

1. Buka https://vercel.com dan login dengan akun GitHub
2. Klik "Add New Project"
3. Import repository GitHub yang baru dibuat
4. Klik "Deploy"
5. Tunggu beberapa menit, website Anda sudah live! 🚀

### Cara 2: Menggunakan Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel
\`\`\`

## Langkah 7: Custom Domain (Opsional)

Jika Anda memiliki domain sendiri:

1. Buka dashboard Vercel
2. Pilih project Anda
3. Klik "Settings" → "Domains"
4. Tambahkan domain Anda
5. Update DNS settings di domain registrar

## Fitur Gratis Vercel

Vercel memberikan banyak fitur gratis untuk hobby projects:

- ✅ Unlimited deployments
- ✅ HTTPS otomatis
- ✅ CDN global
- ✅ Preview deployments untuk setiap branch
- ✅ Automatic CI/CD dari GitHub
- ✅ Analytics dasar
- ✅ 100GB bandwidth per bulan

## Tips Optimasi

### 1. Gunakan Image Optimization

\`\`\`tsx
import Image from 'next/image';

export default function Page() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1200}
      height={600}
      priority
    />
  );
}
\`\`\`

### 2. Gunakan Metadata untuk SEO

\`\`\`tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Website',
  description: 'Website keren dibuat dengan Next.js',
};
\`\`\`

### 3. Environment Variables

Untuk menyimpan secrets, gunakan environment variables di Vercel:

1. Buka Settings → Environment Variables
2. Tambahkan variabel yang diperlukan
3. Akses di kode dengan \`process.env.NAMA_VARIABEL\`

## Automatic Deployments

Setiap kali Anda push ke GitHub, Vercel akan otomatis deploy:

\`\`\`bash
git add .
git commit -m "Update homepage"
git push
\`\`\`

Dalam hitungan menit, perubahan sudah live di production! 🎉

## Kesimpulan

Dengan Next.js dan Vercel, Anda bisa membuat dan deploy website profesional secara gratis dalam hitungan menit. Tidak perlu setup server, SSL, atau CDN - semuanya sudah diurus oleh Vercel.

Selamat mencoba dan happy coding! 🚀
    `,
    coverImage: "/blog/nextjs-vercel.jpg",
    category: "Frontend",
    tags: ["Next.js", "Vercel", "Deploy", "Tutorial", "Free Hosting"],
    author: {
      name: "Ari Dwi Utomo",
      avatar: "/avatar.jpg",
    },
    publishedAt: "2026-01-30",
    readingTime: 12,
  },
];

// Helper functions - These will be replaced with API calls to your CMS
export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag));
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count);
}

export function getAllCategories(): string[] {
  const categories = blogPosts.map((post) => post.category);
  return [...new Set(categories)];
}

export function getAllTags(): string[] {
  const tags = blogPosts.flatMap((post) => post.tags);
  return [...new Set(tags)];
}
