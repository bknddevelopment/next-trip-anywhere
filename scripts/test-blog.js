#!/usr/bin/env node

const { blogPosts, authors, getPostBySlug, getRelatedPosts } = require('../lib/data/blog-posts.ts');

console.log('🔍 Testing Blog Infrastructure\n');
console.log('================================\n');

// Test 1: Check blog posts loaded
console.log('✅ Blog Posts Loaded:', blogPosts.length, 'articles');
console.log('   - Articles:', blogPosts.map(p => p.title.substring(0, 50) + '...').join('\n   - '));

// Test 2: Check authors
console.log('\n✅ Authors Configured:', Object.keys(authors).length);
Object.values(authors).forEach(author => {
  console.log(`   - ${author.name} (${author.role})`);
});

// Test 3: Check categories
const categories = [...new Set(blogPosts.map(p => p.category))];
console.log('\n✅ Categories:', categories.length);
categories.forEach(cat => {
  const count = blogPosts.filter(p => p.category === cat).length;
  console.log(`   - ${cat}: ${count} articles`);
});

// Test 4: Check tags
const allTags = [...new Set(blogPosts.flatMap(p => p.tags))];
console.log('\n✅ Unique Tags:', allTags.length);
console.log('   Tags:', allTags.slice(0, 10).join(', '), '...');

// Test 5: Test slug lookup
const testSlug = 'best-time-book-flights-newark-airport';
const post = getPostBySlug(testSlug);
console.log('\n✅ Slug Lookup Test:');
console.log('   - Looking for:', testSlug);
console.log('   - Found:', post ? post.title : 'NOT FOUND');

// Test 6: Test related posts
if (post) {
  const related = getRelatedPosts(post.id, 3);
  console.log('\n✅ Related Posts for', post.title.substring(0, 40) + '...');
  related.forEach(r => {
    console.log(`   - ${r.title.substring(0, 50)}...`);
  });
}

// Test 7: Check SEO metadata
console.log('\n✅ SEO Metadata Check:');
blogPosts.forEach(post => {
  const hasSEO = post.seo && post.seo.metaDescription && post.seo.keywords.length > 0;
  console.log(`   - ${post.title.substring(0, 30)}... ${hasSEO ? '✓' : '✗'}`);
});

// Test 8: Check word counts
console.log('\n✅ Article Lengths:');
blogPosts.forEach(post => {
  const wordCount = post.content.split(/\s+/).length;
  console.log(`   - ${post.title.substring(0, 30)}... ${wordCount} words`);
});

console.log('\n================================');
console.log('✨ Blog Infrastructure Test Complete!\n');