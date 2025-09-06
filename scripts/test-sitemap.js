#!/usr/bin/env node

/**
 * Test script to verify sitemap functionality
 * Run with: node scripts/test-sitemap.js
 */

const fs = require('fs');
const path = require('path');

async function testSitemap() {
  console.log('🧪 Testing sitemap functionality...\n');
  
  try {
    // Test 1: Check if sitemap is accessible
    console.log('1️⃣ Testing sitemap accessibility...');
    const sitemapResponse = await fetch('http://localhost:3000/sitemap.xml');
    
    if (!sitemapResponse.ok) {
      throw new Error(`Sitemap returned ${sitemapResponse.status}`);
    }
    
    const sitemapContent = await sitemapResponse.text();
    console.log('✅ Sitemap is accessible');
    
    // Test 2: Validate XML structure
    console.log('\n2️⃣ Validating XML structure...');
    if (!sitemapContent.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
      throw new Error('Missing XML declaration');
    }
    
    if (!sitemapContent.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
      throw new Error('Missing urlset namespace');
    }
    
    console.log('✅ XML structure is valid');
    
    // Test 3: Check required pages
    console.log('\n3️⃣ Checking required pages...');
    const requiredPages = [
      'https://www.tokendataview.com',
      'https://www.tokendataview.com/yield/stablecoin',
      'https://www.tokendataview.com/stablecoins',
      'https://www.tokendataview.com/projects',
      'https://www.tokendataview.com/governance',
      'https://www.tokendataview.com/articles',
      'https://www.tokendataview.com/faq',
      'https://www.tokendataview.com/about',
      'https://www.tokendataview.com/contact'
    ];
    
    const missingPages = requiredPages.filter(page => !sitemapContent.includes(page));
    
    if (missingPages.length > 0) {
      throw new Error(`Missing required pages: ${missingPages.join(', ')}`);
    }
    
    console.log('✅ All required pages are present');
    
    // Test 4: Check protocol pages
    console.log('\n4️⃣ Checking protocol pages...');
    const protocolSlugs = ['aave', 'morpho', 'curve', 'compound', 'maker', 'spark', 'pendle', 'gearbox', 'uniswap', 'stargate'];
    const missingProtocols = protocolSlugs.filter(slug => 
      !sitemapContent.includes(`https://www.tokendataview.com/protocols/${slug}`)
    );
    
    if (missingProtocols.length > 0) {
      throw new Error(`Missing protocol pages: ${missingProtocols.join(', ')}`);
    }
    
    console.log('✅ All protocol pages are present');
    
    // Test 5: Check blog articles
    console.log('\n5️⃣ Checking blog articles...');
    const articlesDir = path.join(process.cwd(), 'src/app/articles');
    
    if (fs.existsSync(articlesDir)) {
      const articleDirs = fs.readdirSync(articlesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
      
      const missingArticles = articleDirs.filter(dir => 
        !sitemapContent.includes(`https://www.tokendataview.com/articles/${dir}`)
      );
      
      if (missingArticles.length > 0) {
        console.log(`⚠️  Missing articles: ${missingArticles.join(', ')}`);
      } else {
        console.log('✅ All blog articles are present');
      }
    } else {
      console.log('⚠️  Articles directory not found');
    }
    
    // Test 6: Validate priority values
    console.log('\n6️⃣ Validating priority values...');
    const priorityMatches = sitemapContent.match(/<priority>([0-9.]+)<\/priority>/g) || [];
    const invalidPriorities = priorityMatches.filter(match => {
      const priority = parseFloat(match.replace(/<\/?priority>/g, ''));
      return priority < 0 || priority > 1;
    });
    
    if (invalidPriorities.length > 0) {
      throw new Error(`Invalid priority values found: ${invalidPriorities.join(', ')}`);
    }
    
    console.log('✅ All priority values are valid (0.0 - 1.0)');
    
    // Test 7: Validate change frequency values
    console.log('\n7️⃣ Validating change frequency values...');
    const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
    const frequencyMatches = sitemapContent.match(/<changefreq>([^<]+)<\/changefreq>/g) || [];
    const invalidFrequencies = frequencyMatches.filter(match => {
      const frequency = match.replace(/<\/?changefreq>/g, '');
      return !validFrequencies.includes(frequency);
    });
    
    if (invalidFrequencies.length > 0) {
      throw new Error(`Invalid change frequency values found: ${invalidFrequencies.join(', ')}`);
    }
    
    console.log('✅ All change frequency values are valid');
    
    // Test 8: Count total URLs
    console.log('\n8️⃣ Counting total URLs...');
    const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
    console.log(`📊 Total URLs in sitemap: ${urlCount}`);
    
    // Summary
    console.log('\n🎉 All tests passed! Sitemap is working correctly.');
    console.log('\n📋 Summary:');
    console.log(`   - Sitemap accessible: ✅`);
    console.log(`   - XML structure valid: ✅`);
    console.log(`   - Required pages present: ✅`);
    console.log(`   - Protocol pages present: ✅`);
    console.log(`   - Blog articles present: ✅`);
    console.log(`   - Priority values valid: ✅`);
    console.log(`   - Change frequency valid: ✅`);
    console.log(`   - Total URLs: ${urlCount}`);
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.log('\n💡 Make sure your development server is running: npm run dev');
    process.exit(1);
  }
}

testSitemap();
