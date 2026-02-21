import { NextResponse } from 'next/server';
import { PROJECT_IMAGES, DEFAULT_PROJECT_IMAGE } from '@/config/projectImages';

// Define Project interface
interface GitHubProject {
  id: string;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
}

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'anuththara';
  const selectedProjects = searchParams.get('selected')?.split(',') || [];
  const excludedProjects = searchParams.get('excluded')?.split(',') || [];
  const minStars = parseInt(searchParams.get('minStars') || '0');
  const requireDescription = searchParams.get('requireDescription') === 'true';
  const excludeForks = searchParams.get('excludeForks') === 'true';

  try {
    // Fetch repositories from GitHub API
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub repos: ${response.status}`);
    }

    const repos: GitHubProject[] = await response.json();

    // Filter and transform repositories
    const filteredRepos = repos.filter(repo => {
      // Skip excluded projects
      if (excludedProjects.includes(repo.name)) return false;
      
      // Skip archived or disabled repos
      if (repo.archived || repo.disabled) return false;
      
      // Skip forks if excludeForks is true
      if (excludeForks && repo.fork) return false;
      
      // Skip repos without description if requireDescription is true
      if (requireDescription && !repo.description) return false;
      
      // Skip repos with fewer stars than minStars
      if (repo.stargazers_count < minStars) return false;
      
      // If selectedProjects is specified, only include those
      if (selectedProjects.length > 0 && !selectedProjects.includes(repo.name)) return false;
      
      return true;
    });

    // Sort by stars (descending), then by updated date
    filteredRepos.sort((a, b) => {
      if (a.stargazers_count !== b.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    // Transform to our Project format
    const projects: Project[] = filteredRepos.slice(0, 12).map(repo => ({
      id: repo.id.toString(),
      title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: repo.description || 'No description available',
      githubUrl: repo.html_url,
      liveUrl: repo.homepage || undefined,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language || 'Other',
      topics: repo.topics || [],
      createdAt: new Date(repo.created_at).toISOString().split('T')[0],
      updatedAt: new Date(repo.updated_at).toISOString().split('T')[0],
      image: PROJECT_IMAGES[repo.name] ?? DEFAULT_PROJECT_IMAGE,
    }));

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub projects', projects: [] },
      { status: 500 }
    );
  }
} 