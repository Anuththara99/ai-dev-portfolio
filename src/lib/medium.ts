// Define BlogPost interface locally
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readTime: string;
  mediumUrl: string;
  tags: string[];
  featuredImage?: string;
}

// Fetch Medium posts using our API route
export async function fetchMediumPosts(username: string): Promise<BlogPost[]> {
  try {
    const response = await fetch(`/api/medium-posts?username=${username}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Medium posts: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
}

// Alternative: Use Medium's JSON API (requires API key)
export async function fetchMediumPostsAPI(username: string, apiKey?: string): Promise<BlogPost[]> {
  if (!apiKey) {
    console.warn('Medium API key not provided, falling back to RSS feed');
    return fetchMediumPosts(username);
  }
  
  try {
    const response = await fetch(`https://api.medium.com/v1/users/${username}/publications`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    await response.json();
    // Transform Medium API response to BlogPost format
    // Implementation depends on Medium API structure
    
    return [];
  } catch (error) {
    console.error('Error fetching Medium posts via API:', error);
    return fetchMediumPosts(username);
  }
} 