import { NextResponse } from 'next/server';

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

// Strips CDATA wrappers and HTML tags from raw XML strings
function cleanXml(raw: string): string {
  return raw
    .replace(/<!\[CDATA\[|\]\]>/g, '') // remove CDATA wrappers
    .replace(/<[^>]*>/g, '')            // remove any remaining HTML/XML tags
    .trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'anuththara.sachini';

  try {
    const response = await fetch(`https://medium.com/feed/@${username}`, {
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Medium feed: ${response.status}`);
    }

    const xmlText = await response.text();

    const posts: BlogPost[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    let index = 0;

    while ((match = itemRegex.exec(xmlText)) !== null && index < 6) {
      const item = match[1];

      // Title — Medium wraps in CDATA
      const titleMatch = item.match(/<title>([\s\S]*?)<\/title>/);
      const title = titleMatch ? cleanXml(titleMatch[1]) : '';

      // Link
      const linkMatch = item.match(/<link>(.*?)<\/link>/);
      const link = linkMatch ? linkMatch[1].trim() : '';

      // pubDate
      const dateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
      const pubDate = dateMatch ? dateMatch[1].trim() : '';

      // Categories — each one may be CDATA-wrapped
      const categoryMatches = item.match(/<category>([\s\S]*?)<\/category>/g);
      const tags = categoryMatches
        ? categoryMatches
            .map(cat => cleanXml(cat))
            .filter(Boolean)
            .slice(0, 5)
        : [];

      // Description — strip all HTML to get plain text excerpt
      const descMatch = item.match(/<description>([\s\S]*?)<\/description>/);
      const rawDesc = descMatch ? cleanXml(descMatch[1]) : '';
      const excerpt = rawDesc.length > 150
        ? rawDesc.substring(0, 150) + '...'
        : rawDesc;

      // Read time estimate
      const wordCount = rawDesc.split(/\s+/).length;
      const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

      // Featured image — look in content:encoded first, then description
      const contentMatch = item.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/);
      const contentBlock = contentMatch ? contentMatch[1] : item;
      const imageMatch = contentBlock.match(/<img[^>]+src="([^"]+)"/);
      const featuredImage = imageMatch ? imageMatch[1] : undefined;

      posts.push({
        id: `medium-${index}`,
        title,
        excerpt,
        publishedDate: pubDate
          ? new Date(pubDate).toISOString().split('T')[0]
          : '',
        readTime,
        mediumUrl: link,
        tags,
        featuredImage,
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