import { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';

interface ScrapedData {
  title?: string;
  image?: string;
  description?: string;
  siteName?: string;
  favicon?: string;
  author?: string;
  publishedTime?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    // Enhanced headers to mimic real browser and avoid blocking
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0'
      },
      timeout: 10000, // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Get base URL for resolving relative paths
    const baseUrl = new URL(url);
    const baseHref = `${baseUrl.protocol}//${baseUrl.host}`;

    const scrapedData: ScrapedData = {
      // Enhanced title extraction - prioritize actual news headlines
      title: 
        // Try news-specific selectors first
        $('h1.entry-title').text().trim() ||
        $('h1.post-title').text().trim() ||
        $('h1.article-title').text().trim() ||
        $('.headline h1').text().trim() ||
        $('.story-headline').text().trim() ||
        $('h1[class*="headline"]').text().trim() ||
        $('h1[class*="title"]').first().text().trim() ||
        // Then try meta tags
        $('meta[property="og:title"]').attr('content') || 
        $('meta[name="twitter:title"]').attr('content') || 
        $('title').text().replace(/\s*\|\s*.*$/, '').trim() || // Remove site name from title
        $('h1').first().text().trim(),

      // Enhanced image extraction - look for article featured images
      image: 
        $('meta[property="og:image"]').attr('content') || 
        $('meta[name="twitter:image"]').attr('content') || 
        $('meta[property="og:image:url"]').attr('content') ||
        // Look for featured/hero images
        $('.featured-image img').first().attr('src') ||
        $('.hero-image img').first().attr('src') ||
        $('.article-image img').first().attr('src') ||
        $('.post-thumbnail img').first().attr('src') ||
        $('img[class*="featured"]').first().attr('src') ||
        // Look in article content
        $('article img').first().attr('src') ||
        $('.entry-content img').first().attr('src') ||
        $('.post-content img').first().attr('src') ||
        // Fallback to any image with reasonable size
        $('img[width]').filter((i, el) => {
          const width = parseInt($(el).attr('width') || '0');
          return width > 200; // Only images wider than 200px
        }).first().attr('src'),

      // Enhanced description extraction
      description: 
        $('meta[property="og:description"]').attr('content') || 
        $('meta[name="twitter:description"]').attr('content') || 
        $('meta[name="description"]').attr('content') ||
        $('.excerpt').first().text().trim() ||
        $('.summary').first().text().trim() ||
        $('article p').first().text().trim().substring(0, 200) ||
        $('.entry-content p').first().text().trim().substring(0, 200) ||
        $('.post-content p').first().text().trim().substring(0, 200),

      // Site information
      siteName: 
        $('meta[property="og:site_name"]').attr('content') ||
        $('meta[name="application-name"]').attr('content') ||
        baseUrl.hostname.replace('www.', ''),

      // Enhanced favicon extraction with multiple fallbacks
      favicon: 
        $('link[rel="apple-touch-icon"]').first().attr('href') ||
        $('link[rel="icon"][type="image/png"]').first().attr('href') ||
        $('link[rel="icon"][type="image/x-icon"]').first().attr('href') ||
        $('link[rel="icon"]').first().attr('href') || 
        $('link[rel="shortcut icon"]').first().attr('href') ||
        // Fallback to common favicon paths
        `${baseHref}/favicon.ico` ||
        `${baseHref}/apple-touch-icon.png` ||
        `${baseHref}/favicon.png`,

      // Author extraction
      author: 
        $('meta[name="author"]').attr('content') ||
        $('meta[property="article:author"]').attr('content') ||
        $('.author-name').first().text().trim() ||
        $('.byline').first().text().trim() ||
        $('[class*="author"]').first().text().trim(),

      // Enhanced published time extraction
      publishedTime: 
        $('meta[property="article:published_time"]').attr('content') ||
        $('meta[name="publish-date"]').attr('content') ||
        $('time[datetime]').first().attr('datetime') ||
        $('.published-date').first().attr('datetime') ||
        $('.date').first().text().trim()
    };

    // Clean up and resolve relative URLs
    if (scrapedData.image && !scrapedData.image.startsWith('http')) {
      try {
        scrapedData.image = new URL(scrapedData.image, baseHref).href;
      } catch (e) {
        console.warn('Failed to resolve image URL:', scrapedData.image);
        scrapedData.image = undefined;
      }
    }

    if (scrapedData.favicon && !scrapedData.favicon.startsWith('http')) {
      try {
        scrapedData.favicon = new URL(scrapedData.favicon, baseHref).href;
      } catch (e) {
        console.warn('Failed to resolve favicon URL:', scrapedData.favicon);
        scrapedData.favicon = `${baseHref}/favicon.ico`; // Fallback
      }
    }

    // Clean up title - remove extra whitespace and common suffixes
    if (scrapedData.title) {
      scrapedData.title = scrapedData.title
        .replace(/\s+/g, ' ')
        .replace(/\s*[-–—|]\s*[^-–—|]*$/, '') // Remove site name after dash/pipe
        .trim();
    }

    // Validate favicon by attempting to fetch it
    if (scrapedData.favicon) {
      try {
        const faviconResponse = await fetch(scrapedData.favicon, { 
          method: 'HEAD',
          timeout: 3000 
        });
        if (!faviconResponse.ok) {
          scrapedData.favicon = `${baseHref}/favicon.ico`;
        }
      } catch (e) {
        scrapedData.favicon = `${baseHref}/favicon.ico`;
      }
    }

    console.log(`Scraped data for ${url}:`, {
      title: scrapedData.title?.substring(0, 50) + '...',
      hasImage: !!scrapedData.image,
      hasFavicon: !!scrapedData.favicon,
      siteName: scrapedData.siteName
    });

    res.status(200).json(scrapedData);
  } catch (error) {
    console.error('Scraping error for', url, ':', error);
    
    // Provide intelligent fallbacks based on URL
    const baseUrl = new URL(url);
    const siteName = baseUrl.hostname.replace('www.', '');
    
    res.status(200).json({ 
      title: `Latest news from ${siteName}`,
      image: null,
      description: `Stay updated with breaking news and insights from ${siteName}`,
      siteName: siteName,
      favicon: `${baseUrl.protocol}//${baseUrl.host}/favicon.ico`,
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}