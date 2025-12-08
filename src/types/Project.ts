export type Project = {
  id: number;
  created_at?: string;
  user_id?: string;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
  tags: string[];
  tools: string[];
};

export type ProjectInput = Omit<Project, 'id' | 'created_at' | 'user_id'>;