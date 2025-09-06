#!/usr/bin/env node

/**
 * Verify SEO files (sitemap.xml and robots.txt) are accessible and properly configured
 * Run with: node scripts/verify-seo-files.js
 */

async function verifySEOFiles() {
  console.log('🔍 Verifying SEO files accessibility...\n');

  const baseUrl = 'http://localhost:3000';
  let allGood = true;

  try {
    // Test 1: Check robots.txt
    console.log('1️⃣ Testing robots.txt accessibility...');
    const robotsResponse = await fetch(`${baseUrl}/robots.txt`);

    if (!robotsResponse.ok) {
      console.error(`❌ robots.txt returned ${robotsResponse.status}`);
      allGood = false;
    } else {
      const robotsContent = await robotsResponse.text();
      console.log('✅ robots.txt is accessible');

      // Check if sitemap is referenced
      if (robotsContent.includes('Sitemap:')) {
        console.log('✅ robots.txt references sitemap');
      } else {
        console.error('❌ robots.txt does not reference sitemap');
        allGood = false;
      }

      // Check if sitemap URL is correct
      if (robotsContent.includes('https://www.tokendataview.com/sitemap.xml')) {
        console.log('✅ robots.txt has correct sitemap URL');
      } else {
        console.error('❌ robots.txt has incorrect sitemap URL');
        allGood = false;
      }
    }

    // Test 2: Check sitemap.xml
    console.log('\n2️⃣ Testing sitemap.xml accessibility...');
    const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);

    if (!sitemapResponse.ok) {
      console.error(`❌ sitemap.xml returned ${sitemapResponse.status}`);
      allGood = false;
    } else {
      const sitemapContent = await sitemapResponse.text();
      console.log('✅ sitemap.xml is accessible');

      // Check XML structure
      if (sitemapContent.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
        console.log('✅ sitemap.xml has proper XML declaration');
      } else {
        console.error('❌ sitemap.xml missing XML declaration');
        allGood = false;
      }

      if (
        sitemapContent.includes(
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        )
      ) {
        console.log('✅ sitemap.xml has proper namespace');
      } else {
        console.error('❌ sitemap.xml missing proper namespace');
        allGood = false;
      }

      // Check for required sections
      const requiredSections = [
        'yield/stablecoin',
        'stablecoins',
        'projects',
        'articles',
        'protocols/',
      ];

      const missingSections = requiredSections.filter(
        (section) => !sitemapContent.includes(section)
      );

      if (missingSections.length === 0) {
        console.log('✅ sitemap.xml includes all key sections');
      } else {
        console.error(
          `❌ sitemap.xml missing sections: ${missingSections.join(', ')}`
        );
        allGood = false;
      }

      // Check for lastmod tags
      const lastmodCount = (sitemapContent.match(/<lastmod>/g) || []).length;
      const urlCount = (sitemapContent.match(/<loc>/g) || []).length;

      if (lastmodCount === urlCount) {
        console.log('✅ All URLs have lastmod timestamps');
      } else {
        console.error(
          `❌ Only ${lastmodCount}/${urlCount} URLs have lastmod timestamps`
        );
        allGood = false;
      }

      console.log(
        `📊 Sitemap contains ${urlCount} URLs with ${lastmodCount} lastmod timestamps`
      );
    }

    // Test 3: Check Content-Type headers
    console.log('\n3️⃣ Testing Content-Type headers...');

    const robotsHeaders = await fetch(`${baseUrl}/robots.txt`).then(
      (r) => r.headers
    );
    const sitemapHeaders = await fetch(`${baseUrl}/sitemap.xml`).then(
      (r) => r.headers
    );

    if (robotsHeaders.get('content-type')?.includes('text/plain')) {
      console.log('✅ robots.txt has correct Content-Type');
    } else {
      console.log(
        `⚠️  robots.txt Content-Type: ${robotsHeaders.get('content-type')}`
      );
    }

    if (sitemapHeaders.get('content-type')?.includes('xml')) {
      console.log('✅ sitemap.xml has correct Content-Type');
    } else {
      console.log(
        `⚠️  sitemap.xml Content-Type: ${sitemapHeaders.get('content-type')}`
      );
    }

    // Summary
    console.log('\n📋 Summary:');
    if (allGood) {
      console.log('🎉 All SEO files are properly configured and accessible!');
      console.log('\n✅ Your website is ready for search engine crawling:');
      console.log('   - robots.txt is accessible and references sitemap');
      console.log('   - sitemap.xml is accessible with proper XML structure');
      console.log('   - All key sections are included in sitemap');
      console.log('   - All URLs have lastmod timestamps');
      console.log('\n🚀 Next steps:');
      console.log('   1. Submit sitemap to Google Search Console');
      console.log('   2. Submit sitemap to Bing Webmaster Tools');
      console.log('   3. Monitor indexing status in both tools');
    } else {
      console.log('❌ Some issues found with SEO files');
      console.log('\n💡 Fix the issues above and run this script again');
    }
  } catch (error) {
    console.error('\n❌ Error verifying SEO files:', error.message);
    console.log(
      '\n💡 Make sure your development server is running: npm run dev'
    );
    process.exit(1);
  }
}

verifySEOFiles();
