export type Blog = {
  id: number;
  created_at?: string;
  user_id?: string;
  title: string;
  slug: string;       
  excerpt: string;     
  content: string;     
  cover_image: string;
  tags: string[];
  is_published: boolean; 
};

export type BlogInput = Omit<Blog, 'id' | 'created_at' | 'user_id'>;