# GitHub Projects Integration Setup

Your portfolio now automatically fetches projects from your GitHub account! This guide explains how to set up and customize the GitHub integration.

## 🚀 Quick Setup

### 1. Update Your GitHub Username

Edit `src/config/github.ts` and update the username:

```typescript
export const GITHUB_CONFIG = {
  // Your GitHub username
  username: 'your-actual-username',
  
  // Your GitHub profile URL
  profileUrl: 'https://github.com/your-actual-username',
  
  // Number of projects to fetch (max 12 for the grid layout)
  maxProjects: 12,
  
  // Selected project names to display (leave empty to show all)
  selectedProjects: [
    // Add your repository names here
    'portfolio-website',
    'ecommerce-app',
    'ai-chatbot',
  ],
  
  // Projects to exclude (will be filtered out)
  excludedProjects: [
    'your-username', // Your username (usually a profile repo)
    'your-username.github.io', // GitHub Pages repo
    // Add any repos you don't want to show
  ],
  
  // Minimum stars required to show a project (0 = show all)
  minStars: 0,
  
  // Show only projects with descriptions
  requireDescription: false,
  
  // Show only projects that are not forks
  excludeForks: false,
} as const;
```

### 2. Select Specific Projects (Optional)

To show only specific projects, add their repository names to the `selectedProjects` array:

```typescript
selectedProjects: [
  'my-best-project',
  'portfolio-website',
  'awesome-app',
],
```

### 3. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the projects section
3. The component will automatically fetch your GitHub repositories
4. If no projects are found, it will show a helpful message

## 🔧 How It Works

### Automatic GitHub API Integration

The system uses GitHub's public API to fetch your repositories:

- **Server-side API**: `/api/github-projects` fetches repositories server-side
- **Real-time data**: Projects are fetched fresh each time the page loads
- **Smart filtering**: Filters out archived, disabled, and excluded repos
- **Rich metadata**: Extracts stars, forks, languages, topics, and more

### Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Projects.tsx  │───▶│  /api/github-    │───▶│  GitHub API     │
│   Component     │    │  projects/route  │    │  (Public)       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│  Error State    │    │  Filtered &      │
│  (if needed)    │    │  Sorted Projects │
└─────────────────┘    └──────────────────┘
```

## ✨ Features

- ✅ **Automatic project fetching** from your GitHub account
- ✅ **Project selection** - choose which repos to showcase
- ✅ **Smart filtering** - exclude unwanted repositories
- ✅ **Rich project cards** with stars, forks, and languages
- ✅ **Live demo links** - automatically detects homepage URLs
- ✅ **GitHub topics** - shows repository topics as tags
- ✅ **Responsive design** with beautiful glassmorphism cards
- ✅ **Loading states** and error handling
- ✅ **Real-time updates** - always shows your latest projects
- ✅ **Dark mode support**
- ✅ **Smooth animations** with Framer Motion

## 🎨 Customization

### Project Selection Options

#### Show All Projects
```typescript
selectedProjects: [], // Empty array = show all
```

#### Show Specific Projects Only
```typescript
selectedProjects: [
  'portfolio-website',
  'ecommerce-app',
  'ai-chatbot',
],
```

#### Filter by Stars
```typescript
minStars: 5, // Only show projects with 5+ stars
```

#### Exclude Forks
```typescript
excludeForks: true, // Only show original projects
```

#### Require Descriptions
```typescript
requireDescription: true, // Only show projects with descriptions
```

### Customize the Display

#### Change Number of Projects
```typescript
maxProjects: 9, // Show 9 projects instead of 12
```

Then update the grid layout in `src/components/portfolio/Projects.tsx`:

```typescript
<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
```

#### Customize Card Styling

The project cards use Tailwind CSS classes. You can customize:

- **Card colors**: Modify the `GlassCard` component
- **Typography**: Update text classes in the Projects component
- **Animations**: Adjust Framer Motion settings
- **Layout**: Change grid columns and spacing

### Different Card Styles

```typescript
// Minimal style
<GlassCard className="border-0 bg-white/10 dark:bg-gray-900/20">

// Bold style
<GlassCard className="border-2 border-blue-500/30 bg-blue-50/20 dark:bg-blue-900/20">

// Gradient style
<GlassCard className="bg-gradient-to-br from-white/20 to-blue-100/20 dark:from-gray-800/30 dark:to-blue-900/20">
```

## 🎯 Project Selection Strategies

### Strategy 1: Show Best Projects Only
```typescript
selectedProjects: [
  'my-best-project',
  'portfolio-website',
  'awesome-app',
],
excludeForks: true,
minStars: 1,
```

### Strategy 2: Show Recent Projects
```typescript
selectedProjects: [], // Show all
excludeForks: true,
requireDescription: true,
```

### Strategy 3: Show Popular Projects
```typescript
selectedProjects: [], // Show all
minStars: 5,
excludeForks: true,
```

### Strategy 4: Show All Active Projects
```typescript
selectedProjects: [],
excludeForks: false,
requireDescription: true,
```

## 🐛 Troubleshooting

### Projects Not Loading?

1. **Check your username**: Make sure it's correct in `src/config/github.ts`
2. **Verify GitHub account**: Ensure your GitHub account is public
3. **Check browser console**: Look for error messages
4. **Test GitHub API**: Visit `https://api.github.com/users/yourusername/repos`

### API Rate Limits?

GitHub's public API has rate limits:
- **Unauthenticated**: 60 requests per hour
- **Authenticated**: 5,000 requests per hour

If you hit rate limits, consider:
- Adding authentication to the API route
- Implementing caching
- Reducing the number of API calls

### Selected Projects Not Showing?

1. **Check repository names**: Make sure they match exactly (case-sensitive)
2. **Verify repositories exist**: Ensure the repos are in your GitHub account
3. **Check visibility**: Make sure the repos are public
4. **Clear cache**: Try refreshing the page

## 📁 File Structure

```
src/
├── app/
│   └── api/
│       └── github-projects/
│           └── route.ts          # Server-side API route
├── components/
│   └── portfolio/
│       └── Projects.tsx          # Main projects component
├── config/
│   └── github.ts                 # Configuration file
└── lib/
    └── github.ts                 # GitHub API utilities
```

## 🔄 GitHub API vs Manual Data

### GitHub API Advantages:
- ✅ Automatically updates when you create new repositories
- ✅ No manual maintenance required
- ✅ Real-time data with stars, forks, and metadata
- ✅ Includes repository topics and languages
- ✅ Shows live demo links automatically

### GitHub API Disadvantages:
- ❌ Depends on GitHub API availability
- ❌ Subject to rate limits
- ❌ Limited control over project presentation
- ❌ Requires public repositories

### Manual Data Advantages:
- ✅ Full control over presentation
- ✅ Can include private projects
- ✅ Reliable and fast loading
- ✅ No external dependencies

### Manual Data Disadvantages:
- ❌ Requires manual updates
- ❌ Need to maintain project data
- ❌ No automatic metadata updates

## 🚀 Advanced Features

### Add Authentication (Optional)

For higher rate limits, add GitHub authentication:

```typescript
// In src/app/api/github-projects/route.ts
const response = await fetch(`https://api.github.com/users/${username}/repos`, {
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-App',
    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
  }
});
```

### Add Caching

For better performance, implement caching:

```typescript
// Cache projects for 1 hour
const cacheKey = `github-projects-${username}`;
const cached = await redis.get(cacheKey);
if (cached) {
  return NextResponse.json(JSON.parse(cached));
}
```

### Custom Project Images

Replace placeholder images with custom ones:

```typescript
// In the API route, replace the placeholder image generation
image: repo.topics.includes('portfolio') 
  ? '/images/portfolio-project.jpg'
  : `https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=${encodeURIComponent(repo.name)}`
```

## 📝 Next Steps

1. **Update your username** in the config file
2. **Select your best projects** to showcase
3. **Test the integration** with your actual GitHub account
4. **Customize the styling** to match your portfolio theme
5. **Add more repositories** to your GitHub account
6. **Consider adding project detail pages** for full descriptions

## 🤝 Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify your GitHub username is correct
3. Ensure your repositories are public
4. Test the GitHub API URL directly in your browser
5. Check the server logs for API route errors

The system is designed to be robust and will show helpful error messages if anything goes wrong!

## 📚 Additional Resources

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [GitHub API Rate Limits](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) 