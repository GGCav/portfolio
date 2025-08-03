const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const { SupabaseVectorStore } = require('@langchain/community/vectorstores/supabase');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('🔍 Debugging LangChain Function Call...\n');

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "text-embedding-004",
});

async function debugLangChainCall() {
  try {
    console.log('🔍 Testing LangChain SupabaseVectorStore...');
    
    // Create vector store instance
    const vectorStore = new SupabaseVectorStore(embeddings, {
      client: supabase,
      tableName: "knowledge_chunks",
      queryName: "match_documents",
    });

    // Try to get the retriever
    const retriever = vectorStore.asRetriever({
      k: 5,
      searchType: "similarity",
    });

    console.log('📊 Retriever created, attempting search...');
    
    // This should trigger the function call
    const relevantDocs = await retriever.invoke("Python programming");
    
    console.log('✅ Search completed');
    console.log(`📋 Found ${relevantDocs.length} documents`);

  } catch (error) {
    console.error('❌ LangChain error:', error);
    
    // Check if it's a function signature error
    if (error.message && error.message.includes('match_documents')) {
      console.log('\n🔧 This looks like a function signature mismatch!');
      console.log('The error suggests LangChain is calling the function with different parameters than expected.');
    }
  }
}

debugLangChainCall(); 