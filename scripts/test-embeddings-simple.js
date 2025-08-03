const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('🧪 Simple Embedding Test...\n');

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "text-embedding-004",
});

async function testEmbeddings() {
  try {
    // 1. Test embedding creation
    console.log('🔍 Creating test embedding...');
    const testEmbedding = await embeddings.embedQuery("Python programming");
    console.log(`✅ Created embedding with ${testEmbedding.length} dimensions`);
    console.log(`📏 Sample values: [${testEmbedding.slice(0, 5).join(', ')}...]`);

    // 2. Check what's in the database
    console.log('\n📊 Checking database content...');
    const { data: dbData, error: dbError } = await supabase
      .from('knowledge_chunks')
      .select('id, content, embedding')
      .limit(3);

    if (dbError) {
      console.error('❌ Database error:', dbError);
      return;
    }

    console.log(`✅ Found ${dbData.length} records in database`);
    
    if (dbData.length > 0) {
      console.log('📝 Database records:');
      dbData.forEach((record, index) => {
        console.log(`${index + 1}. ID: ${record.id}`);
        console.log(`   Content: ${record.content.substring(0, 100)}...`);
        console.log(`   Embedding type: ${typeof record.embedding}`);
        console.log(`   Embedding length: ${record.embedding ? record.embedding.length : 'null'}`);
        if (record.embedding && typeof record.embedding === 'string') {
          console.log(`   Embedding preview: ${record.embedding.substring(0, 50)}...`);
        }
        console.log('');
      });
    }

    // 3. Test the function with the exact same embedding format
    console.log('🔧 Testing function with database embedding format...');
    const { data: functionResults, error: functionError } = await supabase.rpc('match_documents', {
      query_embedding: testEmbedding,
      match_threshold: 0.1,
      match_count: 5
    });

    if (functionError) {
      console.error('❌ Function error:', functionError);
      return;
    }

    console.log(`✅ Function returned ${functionResults.length} results`);
    
    if (functionResults.length > 0) {
      console.log('📋 Function results:');
      functionResults.forEach((result, index) => {
        console.log(`${index + 1}. ID: ${result.id}, Similarity: ${result.similarity.toFixed(4)}`);
        console.log(`   Content: ${result.content.substring(0, 100)}...`);
        console.log('');
      });
    } else {
      console.log('⚠️  No results - checking if embeddings are compatible...');
      
      // Try with a very low threshold
      const { data: lowThresholdResults, error: lowError } = await supabase.rpc('match_documents', {
        query_embedding: testEmbedding,
        match_threshold: 0.0, // No threshold
        match_count: 5
      });

      if (lowError) {
        console.error('❌ Low threshold error:', lowError);
      } else {
        console.log(`✅ Low threshold returned ${lowThresholdResults.length} results`);
        if (lowThresholdResults.length > 0) {
          console.log('📋 Low threshold results:');
          lowThresholdResults.forEach((result, index) => {
            console.log(`${index + 1}. ID: ${result.id}, Similarity: ${result.similarity.toFixed(4)}`);
            console.log(`   Content: ${result.content.substring(0, 100)}...`);
            console.log('');
          });
        }
      }
    }

  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testEmbeddings(); 