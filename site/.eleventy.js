/**
 * Eleventy Configuration for RamHunter
 * 
 * Includes sitemap generation, related articles, and SEO optimizations
 */

module.exports = function(eleventyConfig) {
  // Add custom filters
  eleventyConfig.addFilter('slug', function(str) {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  });

  eleventyConfig.addFilter('formatNumber', function(num) {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  });

  eleventyConfig.addFilter('formatInt', function(num) {
    return num.toLocaleString('en-US', {
      maximumFractionDigits: 0
    });
  });

  // Date to ISO string (for schema.org)
  eleventyConfig.addFilter('dateToISOString', function(date) {
    if (date instanceof Date) {
      return date.toISOString();
    }
    return new Date(date).toISOString();
  });

  // Date formatting for display
  eleventyConfig.addFilter('dateFormat', function(date) {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  });

  // Excerpt from content
  eleventyConfig.addFilter('excerpt', function(content, length = 150) {
    if (!content) return '';
    const stripped = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (stripped.length <= length) return stripped;
    return stripped.substring(0, length).trim() + '...';
  });

  // Title case filter
  eleventyConfig.addFilter('title', function(text) {
    if (!text) return '';
    return text.replace(/\w\S*/g, txt => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  });

  // Reading time estimate
  eleventyConfig.addFilter('readTime', function(content) {
    if (!content) return 1;
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return Math.max(1, minutes);
  });

  // Limit array items
  eleventyConfig.addFilter('limit', function(arr, count) {
    if (!arr || !Array.isArray(arr)) return [];
    return arr.slice(0, count);
  });

  // Truncate text
  eleventyConfig.addFilter('truncate', function(text, length = 160) {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length - 3) + '...';
  });

  // Escape HTML for JSON-LD
  eleventyConfig.addFilter('escape', function(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  });

  // Shortcode for affiliate boxes - use {% affiliateBox "title", "description", "link" %}
  eleventyConfig.addShortcode('affiliateBox', function(title, description, link) {
    return `<div class="affiliate-box">
  <div class="affiliate-box-header">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
    <strong>Shop This Pick</strong>
  </div>
  <div class="affiliate-box-content">
    <p class="affiliate-box-title">${title}</p>
    <p class="affiliate-box-desc">${description}</p>
    <a href="${link}" target="_blank" rel="noopener" class="affiliate-box-btn">
      Check Price
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
    </a>
  </div>
  <p class="affiliate-box-disclosure">
    <small>We may earn a commission from this link at no extra cost to you.</small>
  </p>
</div>

<style>
.affiliate-box {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.affiliate-box-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #a78bfa;
  font-weight: 600;
}

.affiliate-box-content {
  display: grid;
  gap: 0.75rem;
}

.affiliate-box-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.affiliate-box-desc {
  color: #888;
  margin: 0;
  font-size: 0.95rem;
}

.affiliate-box-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  width: fit-content;
}

.affiliate-box-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.affiliate-box-disclosure {
  margin-top: 1rem;
  color: #666;
  font-size: 0.85rem;
}
</style>`;
  });

  // Default value
  eleventyConfig.addFilter('default', function(value, defaultValue) {
    return value || defaultValue;
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // SITEMAP GENERATION
  // ═══════════════════════════════════════════════════════════════════════════
  
  // Add a collection for sitemap URLs
  eleventyConfig.addCollection('sitemap', function(collectionApi) {
    return collectionApi.getAll().filter((item) => {
      // Exclude pages with no output
      if (!item.url || item.url === false) return false;
      
      // Exclude pages marked as noindex
      if (item.data.robots && item.data.robots.includes('noindex')) return false;
      
      // Exclude draft posts
      if (item.data.draft === true) return false;
      
      // Exclude admin and system pages
      if (item.url.startsWith('/admin/') || item.url.startsWith('/_')) return false;
      
      return true;
    });
  });
  
  // Sitemap priority filter - assign priority based on page type
  eleventyConfig.addFilter('sitemapPriority', function(url, data) {
    if (url === '/') return '1.0';
    if (data.layout === 'category.njk' || data.layout === 'hub.njk') return '0.9';
    if (data.layout === 'article.njk' || data.layout === 'post.njk') return '0.8';
    if (url.includes('/review/')) return '0.8';
    return '0.7';
  });
  
  // Sitemap change frequency filter
  eleventyConfig.addFilter('sitemapChangefreq', function(url, data) {
    if (url === '/') return 'daily';
    if (data.layout === 'category.njk' || data.layout === 'hub.njk') return 'weekly';
    if (data.layout === 'article.njk') return 'monthly';
    return 'weekly';
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // RELATED ARTICLES PLUGIN
  // For internal linking strategy
  // ═══════════════════════════════════════════════════════════════════════════
  
  eleventyConfig.addFilter('relatedArticles', function(article, allArticles, limit = 3) {
    if (!article || !allArticles) return [];
    
    // Normalize categories to arrays (handle both categories array and single category)
    const articleCats = article.data?.categories 
      ? (Array.isArray(article.data.categories) ? article.data.categories : [article.data.categories])
      : [];
    
    const scored = allArticles
      .filter(a => a?.url && a.url !== article.url) // Exclude current article
      .map(a => {
        let score = 0;
        
        // Same category = high relevance
        const aCats = a.data?.categories
          ? (Array.isArray(a.data.categories) ? a.data.categories : [a.data.categories])
          : [];
        if (aCats.length > 0 && articleCats.length > 0 && aCats.some(cat => articleCats.includes(cat))) {
          score += 10;
        }
        
        // Shared tags = medium relevance
        const articleTags = article.data?.tags || [];
        const aTags = a.data?.tags || [];
        const sharedTags = articleTags.filter(t => aTags.includes(t));
        score += sharedTags.length * 3;
        
        // Same section = low relevance
        if (a.data?.section && a.data.section === article.data?.section) {
          score += 2;
        }
        
        return { article: a, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.article);
    
    return scored;
  });

  // Posts collection for blog articles
  eleventyConfig.addCollection('posts', function(collectionApi) {
    return collectionApi.getFilteredByGlob('posts/*.md')
      .sort((a, b) => b.date - a.date);
  });

  // Categories collection
  eleventyConfig.addCollection('categories', function(collectionApi) {
    return collectionApi.getFilteredByGlob('posts/*.md');
  });

  // Add global data
  eleventyConfig.addGlobalData('year', () => new Date().getFullYear());
  eleventyConfig.addGlobalData('categories', () => ['DDR5', 'DDR4', 'DDR3', 'SODIMM', 'ECC']);

  // Pass through static assets
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy('images');

  // Watch targets
  eleventyConfig.addWatchTarget('./css/');
  eleventyConfig.addWatchTarget('./js/');

  return {
    dir: {
      input: '.',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    templateFormats: ['njk', 'html', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};