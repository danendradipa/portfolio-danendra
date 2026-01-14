import { supabase } from "@/lib/supabase";
import { Blog, BlogInput } from "@/types/Blog";
import { deleteFileFromUrl } from "@/helpers/helper";

// GET ALL
export const getBlogs = async (includeUnpublished: boolean = false) => {
  let query = supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (!includeUnpublished) {
    query = query.eq('is_published', true);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data as Blog[];
};

// GET BY SLUG
export const getBlogBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  
  if (error) throw error;
  return data as Blog;
};

// UPLOAD IMAGE

export const uploadImage = async (file: File) => {
  const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
  
  const { error } = await supabase.storage
    .from('portfolio-images')
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from('portfolio-images')
    .getPublicUrl(fileName);
    
  return data.publicUrl;
};

// CREATE

export const createBlog = async (blog: BlogInput) => {
  const { error } = await supabase.from('blogs').insert([blog]);
  if (error) throw error;
};

export const updateBlog = async (id: number, blog: Partial<BlogInput>, oldImageUrl?: string) => {
  if (blog.cover_image && oldImageUrl && blog.cover_image !== oldImageUrl) {
    await deleteFileFromUrl(oldImageUrl);
  }

  const { error } = await supabase
    .from('blogs')
    .update(blog)
    .eq('id', id);
  
  if (error) throw error;
};

// DELETE
export const deleteBlog = async (id: number, imageUrl: string) => {
  await deleteFileFromUrl(imageUrl);

  const { error } = await supabase.from('blogs').delete().eq('id', id);
  if (error) throw error;
};