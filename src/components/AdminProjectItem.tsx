import { Project } from '@/types/Project';
import Image from 'next/image';

type Props = {
    project: Project;
    onEdit: (project: Project) => void;
    // Update Type di sini: onDelete menerima id (number) DAN imageUrl (string)
    onDelete: (id: number, imageUrl: string) => void; 
}

export default function AdminProjectItem({ project, onEdit, onDelete }: Props) {
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded border shadow-sm mb-2 text-black">
            <div className="flex items-center gap-4">
                {/* Gambar Thumbnail Kecil */}
                <Image 
                  src={project.image_url} 
                  alt="mini" 
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded object-cover bg-gray-200" 
                />
                <div>
                    <h3 className="font-bold">{project.title}</h3>
                    {/* Menampilkan tags array pertama saja sebagai preview */}
                    <div className="flex gap-1">
                        {project.tags.slice(0, 2).map((t, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{t}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <button 
                    onClick={() => onEdit(project)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                >
                    Edit
                </button>
                <button 
                    // UPDATE DI SINI: Kirim ID dan IMAGE_URL saat tombol ditekan
                    onClick={() => onDelete(project.id, project.image_url)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}