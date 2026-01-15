// services/projectService.ts
import { supabase } from '@/lib/supabase';
import { Project, ProjectInput } from '@/types/Project';
import { deleteFileFromUrl } from '@/helpers/helper';


// GET ALL
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Project[];
};

// UPLOAD IMAGE
export const uploadImage = async (file: File) => {
  const maxSize = 3 * 1024 * 1024; 
  
  if (file.size > maxSize) {
    throw new Error('File size exceeds 3MB. Please choose a smaller image.');
  }
  
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.');
  }
  
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
export const createProject = async (project: ProjectInput) => {
  const { error } = await supabase.from('projects').insert([project]);
  if (error) throw error;
};

export const updateProject = async (id: number, project: Partial<ProjectInput>, oldImageUrl?: string) => {
  if (project.image_url && oldImageUrl && project.image_url !== oldImageUrl) {
    await deleteFileFromUrl(oldImageUrl);
  }

  const { error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id);
  
  if (error) throw error;
};

// DELETE
export const deleteProject = async (id: number, imageUrl: string) => {
  await deleteFileFromUrl(imageUrl);

  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
};