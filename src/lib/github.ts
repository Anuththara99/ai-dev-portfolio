// Define Project interface
interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  image?: string;
}

// Fetch GitHub projects using our API route
export async function fetchGitHubProjects(username: string, options?: {
  selectedProjects?: string[];
  excludedProjects?: string[];
  minStars?: number;
  requireDescription?: boolean;
  excludeForks?: boolean;
}): Promise<Project[]> {
  try {
    const params = new URLSearchParams({
      username,
      ...(options?.selectedProjects && { selected: options.selectedProjects.join(',') }),
      ...(options?.excludedProjects && { excluded: options.excludedProjects.join(',') }),
      ...(options?.minStars && { minStars: options.minStars.toString() }),
      ...(options?.requireDescription && { requireDescription: options.requireDescription.toString() }),
      ...(options?.excludeForks && { excludeForks: options.excludeForks.toString() }),
    });

    const response = await fetch(`/api/github-projects?${params}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub projects: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.projects || [];
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
} 