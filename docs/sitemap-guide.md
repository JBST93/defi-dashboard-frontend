# Dynamic Sitemap Guide

## Overview

This project uses a dynamic sitemap system that automatically generates XML sitemaps for search engines. The sitemap includes static pages, blog articles, protocol pages, and dynamic content from APIs.

## Features

### ✅ **Automatic Blog Article Discovery**

- Scans `src/app/articles/` directory for new posts
- Extracts publication dates from article metadata
- Uses actual file modification dates as fallback
- Supports both `.tsx` and future `.md`/`.mdx` files
- Priority: 0.8, Change Frequency: weekly

### ✅ **Protocol Pages Support**

- Pre-configured protocol slugs: aave, morpho, curve, compound, maker, spark, pendle, gearbox, uniswap, stargate
- Generates URLs like `/protocols/aave`, `/protocols/morpho`, etc.
- Priority: 0.8, Change Frequency: weekly

### ✅ **Static Pages with SEO-Optimized Priorities**

- Homepage: priority 1.0, daily changefreq
- /yield/stablecoin: priority 0.9, daily changefreq
- /stablecoins, /projects, /governance: priority 0.8, weekly changefreq
- /articles: priority 0.7, weekly changefreq
- /faq: priority 0.7, monthly changefreq
- /about: priority 0.6, monthly changefreq
- /contact: priority 0.5, monthly changefreq

### ✅ **Dynamic Content Integration**

- Fetches project data from API
- Generates project-specific pages
- Creates yield pages for each protocol
- Handles API failures gracefully

### ✅ **Error Handling & Fallbacks**

- Graceful fallback if blog directory doesn't exist
- Handles file reading errors
- Returns minimal sitemap on critical errors
- Valid XML output even with missing content

## File Structure

```
src/app/
├── sitemap.ts          # Main sitemap generator
└── articles/           # Blog articles directory
    ├── article-1/
    │   └── page.tsx
    └── article-2/
        └── page.tsx

scripts/
└── check-sitemap.js    # Sitemap validation script
```

## Usage

### View Sitemap

```bash
# Access sitemap directly
curl http://localhost:3000/sitemap.xml

# Or visit in browser
open http://localhost:3000/sitemap.xml
```

### Check Sitemap Status

```bash
# Run validation script
npm run check-sitemap

# Or run directly
node scripts/check-sitemap.js
```

### Add New Blog Article

1. Create new directory in `src/app/articles/your-article-slug/`
2. Add `page.tsx` file with proper metadata
3. Sitemap will automatically include it on next request

### Add New Protocol

1. Add protocol slug to `PROTOCOL_SLUGS` array in `sitemap.ts`
2. Sitemap will automatically include `/protocols/your-protocol` URL

## Configuration

### Protocol Slugs

Edit the `PROTOCOL_SLUGS` array in `src/app/sitemap.ts`:

```typescript
const PROTOCOL_SLUGS = [
  'aave',
  'morpho',
  'curve',
  'compound',
  'maker',
  'spark',
  'pendle',
  'gearbox',
  'uniswap',
  'stargate',
];
```

### Priority & Change Frequency

Modify the priority and change frequency in the respective functions:

```typescript
// Blog articles
priority: 0.8,
changeFrequency: 'weekly',

// Protocol pages
priority: 0.8,
changeFrequency: 'weekly',

// Static pages
priority: 1.0, // Homepage
changeFrequency: 'daily',
```

## SEO Best Practices

### ✅ **Valid XML Structure**

- Proper XML declaration and namespace
- Correct date formatting (ISO 8601)
- Valid changefreq values (always, hourly, daily, weekly, monthly, yearly, never)
- Priority values between 0.0 and 1.0

### ✅ **Performance Optimization**

- Parallel data fetching for better performance
- Caching with Next.js revalidation
- Error handling to prevent sitemap failures

### ✅ **Search Engine Compatibility**

- Follows sitemap.org protocol
- Includes all important pages
- Updates automatically when content changes

## Monitoring & Maintenance

### Regular Checks

```bash
# Check sitemap health
npm run check-sitemap

# Verify specific URLs
curl -s http://localhost:3000/sitemap.xml | grep "your-url"
```

### Common Issues

1. **Articles not appearing in sitemap**

   - Check if article directory exists in `src/app/articles/`
   - Verify `page.tsx` file exists
   - Check console for file reading errors

2. **Protocol pages missing**

   - Verify protocol slug is in `PROTOCOL_SLUGS` array
   - Check for typos in protocol names

3. **Sitemap not updating**
   - Clear Next.js cache: `rm -rf .next`
   - Restart development server: `npm run dev`
   - Check for TypeScript errors

### Performance Monitoring

The sitemap logs generation statistics:

```
Generated sitemap with 36 URLs:
- Static routes: 9
- Protocol pages: 10
- Blog articles: 17
- Project pages: 0
- Yield pages: 0
```

## Deployment Considerations

### Vercel

- Sitemap updates automatically on each deployment
- No additional configuration needed

### Other Platforms

- May need to trigger rebuild to update sitemap
- Ensure file system access is available for blog scanning

### Search Engine Submission

1. Submit sitemap to Google Search Console
2. Submit to Bing Webmaster Tools
3. Monitor indexing status and errors

## Future Enhancements

### Planned Features

- Support for `.md` and `.mdx` blog files
- Image sitemap generation
- News sitemap for time-sensitive content
- Video sitemap for multimedia content
- Multi-language sitemap support

### Customization Options

- Configurable priority values
- Custom change frequency rules
- Content-based priority adjustment
- A/B testing for sitemap structure

## Troubleshooting

### Debug Mode

Enable detailed logging by checking the console output when accessing `/sitemap.xml`.

### Common Error Messages

- "Articles directory not found" - Check if `src/app/articles/` exists
- "Error reading article" - Check file permissions and content
- "Error fetching projects" - Check API endpoint availability

### Support

For issues or questions about the sitemap system, check the console logs and run the validation script for detailed diagnostics.
