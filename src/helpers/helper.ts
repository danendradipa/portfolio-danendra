export const deleteFileFromUrl = async (imageUrl: string) => {
  try {
    const fileName = imageUrl.split('/').pop(); // Ambil nama file
    if (!fileName) return;

    const { error } = await supabase.storage
      .from('portfolio-images')
      .remove([fileName]);

    if (error) console.warn("Warning: Gagal hapus gambar lama di storage", error);
  } catch (err) {
    console.error("Error helper delete:", err);
  }
};