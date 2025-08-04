import { NextResponse } from 'next/server';

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'anuththara.sachini';

  try {
    const response = await fetch(`https://medium.com/feed/@${username}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Medium feed: ${response.status}`);
    }
    
    const xmlText = await response.text();
    
    // Parse XML using a simple regex-based approach
    const posts: BlogPost[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    let index = 0;
    
    while ((match = itemRegex.exec(xmlText)) !== null && index < 6) { // Max 6 posts for grid layout
      const itemContent = match[1];
      
      // Extract title
      const titleMatch = itemContent.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '') : '';
      
      // Extract description
      const descMatch = itemContent.match(/<description>(.*?)<\/description>/);
      const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '') : '';
      
      // Extract link
      const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
      const link = linkMatch ? linkMatch[1] : '';
      
      // Extract pubDate
      const dateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);
      const pubDate = dateMatch ? dateMatch[1] : '';
      
      // Extract categories
      const categoryMatches = itemContent.match(/<category>(.*?)<\/category>/g);
      const categories = categoryMatches 
        ? categoryMatches.map(cat => cat.replace(/<\/?category>/g, ''))
        : [];
      
      // Extract excerpt from description
      const excerpt = description.length > 150 
        ? description.substring(0, 150) + '...' 
        : description;
      
      // Estimate read time (rough calculation: 200 words per minute)
      const wordCount = description.split(' ').length;
      const readTime = Math.ceil(wordCount / 200);
      
      // Extract featured image from content if available
      const imageMatch = itemContent.match(/<img[^>]+src="([^"]+)"/);
      const featuredImage = imageMatch ? imageMatch[1] : undefined;
      
      posts.push({
        id: `medium-${index}`,
        title,
        excerpt,
        publishedDate: new Date(pubDate).toISOString().split('T')[0],
        readTime: `${readTime} min read`,
        mediumUrl: link,
        tags: categories.slice(0, 5),
        featuredImage
      });
      
      index++;
    }
    
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Medium posts', posts: [] },
      { status: 500 }
    );
  }
} 