/**
 * Custom image mapping for GitHub projects.
 * Keys must match the exact GitHub repository name.
 * Paths are relative to the public folder (e.g. /assets/...).
 */
export const PROJECT_IMAGES: Record<string, string> = {
  "ai-dev-portfolio": "/assets/git-hub-projects/ai-dev-portfolio.png",
  "Covid19-Dashboard": "/assets/git-hub-projects/Covid19-Dashboard.png",
} as const;

/** Default image when no mapping exists for a repo. */
export const DEFAULT_PROJECT_IMAGE = "/assets/git-hub-projects/default.png";
