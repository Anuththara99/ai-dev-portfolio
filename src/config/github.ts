// GitHub configuration
export const GITHUB_CONFIG = {
  // Your GitHub username
  username: 'Anuththara99',
  
  // Your GitHub profile URL
  profileUrl: 'https://github.com/Anuththara99',
  
  // Number of projects to fetch (max 12 for the grid layout)
  maxProjects: 12,
  
  // Selected project names to display (leave empty to show all)
  // Add the exact repository names you want to showcase
  selectedProjects: [
    // Example: 'portfolio-website',
    // Example: 'ecommerce-app',
    // Add your actual repository names here
    'React-Covid19',
    'Covid19-Dashboard',
    'ai-dev-portfolio'
  ],
  
  // Projects to exclude (will be filtered out)
  excludedProjects: [
    'anuththara', // Your username (usually a profile repo)
    'anuththara.github.io', // GitHub Pages repo
    // Add any repos you don't want to show
  ],
  
  // Minimum stars required to show a project (0 = show all)
  minStars: 0,
  
  // Show only projects with descriptions
  requireDescription: false,
  
  // Show only projects that are not forks
  excludeForks: false,
} as const; 