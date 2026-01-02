import { supabase } from "@/lib/supabase";

export const deleteFileFromUrl = async (imageUrl: string) => {
  try {
    const fileName = imageUrl.split('/').pop(); 
    if (!fileName) return;

    const { error } = await supabase.storage
      .from('portfolio-images')
      .remove([fileName]);

    if (error) console.warn("Warning: Gagal hapus gambar lama di storage", error);
  } catch (err) {
    console.error("Error helper delete:", err);
  }
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};
