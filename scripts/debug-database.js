const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('🔍 Debugging Database and Search...\n');

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "text-embedding-004",
});

async function debugDatabase() {
  try {
    // 1. Check if table exists and has data
    console.log('📊 Checking database table...');
    const { data: tableData, error: tableError } = await supabase
      .from('knowledge_chunks')
      .select('id, content, metadata')
      .limit(5);

    if (tableError) {
      console.error('❌ Table error:', tableError);
      return;
    }

    console.log(`✅ Found ${tableData.length} records in table`);
    
    if (tableData.length > 0) {
      console.log('📝 Sample records:');
      tableData.forEach((record, index) => {
        console.log(`${index + 1}. ID: ${record.id}`);
        console.log(`   Content preview: ${record.content.substring(0, 100)}...`);
        console.log(`   Metadata:`, record.metadata);
        console.log('');
      });
    }

    // 2. Test embedding creation
    console.log('🧪 Testing embedding creation...');
    const testEmbedding = await embeddings.embedQuery("Python programming language");
    console.log(`✅ Created embedding with ${testEmbedding.length} dimensions`);
    console.log(`📏 Sample values: [${testEmbedding.slice(0, 5).join(', ')}...]`);

    // 3. Test the match_documents function directly
    console.log('🔍 Testing match_documents function...');
    const { data: searchResults, error: searchError } = await supabase.rpc('match_documents', {
      filter: {},
      match_count: 5,
      query_embedding: testEmbedding
    });

    if (searchError) {
      console.error('❌ Search error:', searchError);
      return;
    }

    console.log(`✅ Found ${searchResults.length} search results`);
    
    if (searchResults.length > 0) {
      console.log('📋 Search results:');
      searchResults.forEach((result, index) => {
        console.log(`${index + 1}. ID: ${result.id}`);
        console.log(`   Similarity: ${result.similarity.toFixed(4)}`);
        console.log(`   Content preview: ${result.content.substring(0, 100)}...`);
        console.log('');
      });
    } else {
      console.log('⚠️  No search results found - this might indicate an issue with the function or data');
    }

    // 4. Check for Python-related content specifically
    console.log('🐍 Looking for Python-related content...');
    const { data: pythonContent, error: pythonError } = await supabase
      .from('knowledge_chunks')
      .select('id, content')
      .ilike('content', '%python%')
      .limit(3);

    if (pythonError) {
      console.error('❌ Python search error:', pythonError);
      return;
    }

    console.log(`✅ Found ${pythonContent.length} records containing "Python"`);
    
    if (pythonContent.length > 0) {
      console.log('📝 Python-related records:');
      pythonContent.forEach((record, index) => {
        console.log(`${index + 1}. ID: ${record.id}`);
        console.log(`   Content: ${record.content.substring(0, 200)}...`);
        console.log('');
      });
    } else {
      console.log('⚠️  No Python content found in database - this suggests the data might not be properly ingested');
    }

  } catch (error) {
    console.error('❌ Debug error:', error);
  }
}

debugDatabase(); 