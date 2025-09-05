#!/usr/bin/env node

/**
 * Script to check sitemap and verify all articles are included
 * Run with: node scripts/check-sitemap.js
 */

const fs = require('fs');
const path = require('path');

async function checkSitemap() {
  console.log('🔍 Checking sitemap for articles...\n');

  try {
    // Get all article directories
    const articlesDir = path.join(process.cwd(), 'src/app/articles');
    const articleDirs = fs
      .readdirSync(articlesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    console.log(`📁 Found ${articleDirs.length} article directories:`);
    articleDirs.forEach((dir) => console.log(`   - ${dir}`));

    // Fetch sitemap
    const sitemapResponse = await fetch('http://localhost:3000/sitemap.xml');
    const sitemapContent = await sitemapResponse.text();

    // Extract article URLs from sitemap
    const articleUrls =
      sitemapContent.match(
        /<loc>https:\/\/www\.tokendataview\.com\/articles\/[^<]+<\/loc>/g
      ) || [];
    const sitemapArticles = articleUrls.map((url) =>
      url
        .replace('<loc>https://www.tokendataview.com/articles/', '')
        .replace('</loc>', '')
    );

    console.log(`\n🗺️  Found ${sitemapArticles.length} articles in sitemap:`);
    sitemapArticles.forEach((article) => console.log(`   - ${article}`));

    // Check for missing articles
    const missingInSitemap = articleDirs.filter(
      (dir) => !sitemapArticles.includes(dir)
    );
    const extraInSitemap = sitemapArticles.filter(
      (article) => !articleDirs.includes(article)
    );

    if (missingInSitemap.length > 0) {
      console.log(
        `\n❌ Articles missing from sitemap (${missingInSitemap.length}):`
      );
      missingInSitemap.forEach((article) => console.log(`   - ${article}`));
    }

    if (extraInSitemap.length > 0) {
      console.log(
        `\n⚠️  Articles in sitemap but not in directory (${extraInSitemap.length}):`
      );
      extraInSitemap.forEach((article) => console.log(`   - ${article}`));
    }

    if (missingInSitemap.length === 0 && extraInSitemap.length === 0) {
      console.log('\n✅ All articles are properly included in the sitemap!');
    }

    console.log(`\n📊 Summary:`);
    console.log(`   - Articles in directory: ${articleDirs.length}`);
    console.log(`   - Articles in sitemap: ${sitemapArticles.length}`);
    console.log(`   - Missing from sitemap: ${missingInSitemap.length}`);
    console.log(`   - Extra in sitemap: ${extraInSitemap.length}`);
  } catch (error) {
    console.error('❌ Error checking sitemap:', error.message);
    console.log(
      '\n💡 Make sure your development server is running: npm run dev'
    );
  }
}

checkSitemap();
