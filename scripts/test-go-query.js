const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const { SupabaseVectorStore } = require('@langchain/community/vectorstores/supabase');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('🔍 Testing Go Language Query...\n');

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "text-embedding-004",
});

async function testGoQuery() {
  try {
    const testQuery = "What do you know about go language with an example";
    console.log('🔍 Testing query:', testQuery);

    // Create vector store instance
    const vectorStore = new SupabaseVectorStore(embeddings, {
      client: supabase,
      tableName: "knowledge_chunks",
      queryName: "match_documents",
    });

    // Perform semantic search
    console.log('🔍 Performing semantic search...');
    const retriever = vectorStore.asRetriever({
      k: 10,
      searchType: "similarity",
    });

    const relevantDocs = await retriever.invoke(testQuery);
    console.log('✅ Found relevant documents:', relevantDocs.length);
    
    // Show all results
    console.log('📋 All documents found:');
    relevantDocs.forEach((doc, index) => {
      console.log(`\n${index + 1}. Content preview: ${doc.pageContent.substring(0, 200)}...`);
      console.log(`   Metadata:`, doc.metadata);
      console.log(`   Category: ${doc.metadata.category}`);
      console.log(`   Keywords: ${doc.metadata.keywords.slice(0, 10).join(', ')}...`);
    });

    // Check for Go-specific content
    console.log('\n🔍 Looking for Go-specific content...');
    const goContent = relevantDocs.filter(doc => 
      doc.pageContent.toLowerCase().includes('go') || 
      doc.metadata.keywords.includes('go')
    );

    console.log(`✅ Found ${goContent.length} documents with Go content:`);
    goContent.forEach((doc, index) => {
      console.log(`\n${index + 1}. Category: ${doc.metadata.category}`);
      console.log(`   Content: ${doc.pageContent.substring(0, 300)}...`);
    });

  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testGoQuery(); 