export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  content: string;
}

export const blogPosts: BlogPost[] = [];

export const blogCategories = ["Windows", "Doors", "Climate & Energy", "Comparisons"] as const;

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
