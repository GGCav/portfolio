const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const { SupabaseVectorStore } = require('@langchain/community/vectorstores/supabase');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('🧪 Testing API Route Logic...\n');

// Initialize clients exactly like the API route
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "text-embedding-004",
});

async function testAPILogic() {
  try {
    const testQuery = "Do you know about python?";
    console.log('🔍 Testing query:', testQuery);

    // 1. Create vector store instance (exactly like API route)
    console.log('📊 Creating vector store instance...');
    const vectorStore = new SupabaseVectorStore(embeddings, {
      client: supabase,
      tableName: "knowledge_chunks",
      queryName: "match_documents",
    });

    // 2. Retrieve relevant context using semantic search (exactly like API route)
    console.log('🔍 Performing semantic search...');
    const retriever = vectorStore.asRetriever({
      k: 10,
      searchType: "similarity",
    });

    const relevantDocs = await retriever.invoke(testQuery);
    console.log('✅ Found relevant documents:', relevantDocs.length);
    
    // Debug: Log the first few documents found
    if (relevantDocs.length > 0) {
      console.log('📋 Top documents found:');
      relevantDocs.slice(0, 3).forEach((doc, index) => {
        console.log(`${index + 1}. Content preview: ${doc.pageContent.substring(0, 150)}...`);
        console.log(`   Metadata:`, doc.metadata);
        console.log('');
      });
    } else {
      console.log('⚠️  No documents found - this matches the API issue');
    }

    // 3. Test direct SQL call to compare
    console.log('🔧 Testing direct SQL call for comparison...');
    const testEmbedding = await embeddings.embedQuery(testQuery);
    const { data: sqlResults, error: sqlError } = await supabase.rpc('match_documents', {
      filter: {},
      match_count: 10,
      query_embedding: testEmbedding
    });

    if (sqlError) {
      console.error('❌ SQL error:', sqlError);
    } else {
      console.log(`✅ Direct SQL found ${sqlResults.length} results`);
      if (sqlResults.length > 0) {
        console.log('📋 SQL results:');
        sqlResults.slice(0, 3).forEach((result, index) => {
          console.log(`${index + 1}. ID: ${result.id}, Similarity: ${result.similarity.toFixed(4)}`);
          console.log(`   Content: ${result.content.substring(0, 100)}...`);
          console.log('');
        });
      }
    }

  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testAPILogic(); 